import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { StringInputProps, set, unset, useClient } from 'sanity';
import {
  Box,
  Button,
  Card,
  Flex,
  Popover,
  Stack,
  Text,
  TextInput,
  Badge,
} from '@sanity/ui';
import { ChevronDownIcon } from '@sanity/icons';

interface SuggestOption {
  value: string;
  isNew?: boolean;
}

export function createSuggestStringInput(defaultSuggestions: string[], fieldName: string) {
  return function SuggestStringInput(props: StringInputProps) {
    const { value, onChange, id, readOnly, elementProps } = props;
    const client = useClient({ apiVersion: '2024-01-01' });

    const [savedSuggestions, setSavedSuggestions] = useState<string[]>(defaultSuggestions);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string | null>(null);

    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const popoverContentRef = useRef<HTMLDivElement | null>(null);

    // Fetch existing values from Sanity dataset to dynamically supplement suggestions
    useEffect(() => {
      let isMounted = true;
      const baseField = fieldName.split('[')[0].split('.')[0];
      client
        .fetch(`*[_type == "product" && defined(${baseField})].${fieldName}`)
        .then((results: unknown) => {
          if (!isMounted) return;
          const flattened = Array.isArray(results) ? results.flat(2) : [];
          const existing = flattened.filter((r): r is string => typeof r === 'string' && Boolean(r.trim()));
          const combined = Array.from(new Set([...defaultSuggestions, ...existing]));
          setSavedSuggestions(combined);
        })
        .catch(() => {});
      return () => {
        isMounted = false;
      };
    }, [client]);

    // Handle outside clicks to close the dropdown
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node | null;
        if (!target) return;

        if (
          (referenceElement && referenceElement.contains(target)) ||
          (popoverContentRef.current && popoverContentRef.current.contains(target))
        ) {
          return;
        }

        setIsOpen(false);
        setQuery(null);
      };

      document.addEventListener('mousedown', handleClickOutside, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }, [isOpen, referenceElement]);

    const displayValue = query !== null ? query : (value || '');

    // Compute suggestion list
    const options: SuggestOption[] = useMemo(() => {
      const currentText = query !== null ? query : (value || '');
      const trimmed = currentText.trim();
      const lower = trimmed.toLowerCase();

      // If user is actively typing / searching (query is not null and not empty)
      if (query !== null && trimmed) {
        const matching = savedSuggestions.filter((s) =>
          s.toLowerCase().includes(lower)
        );
        const list: SuggestOption[] = matching.map((s) => ({ value: s, isNew: false }));
        if (!savedSuggestions.some((s) => s.toLowerCase() === lower)) {
          return [{ value: trimmed, isNew: true }, ...list];
        }
        return list;
      }

      // If opened via dropdown button or query is empty: show all suggestions
      const list: SuggestOption[] = savedSuggestions.map((s) => ({ value: s, isNew: false }));
      if (
        trimmed &&
        !savedSuggestions.some((s) => s.toLowerCase() === lower)
      ) {
        return [{ value: trimmed, isNew: false }, ...list];
      }
      return list;
    }, [query, value, savedSuggestions]);

    const handleSelect = useCallback(
      (selectedValue: string) => {
        const val = selectedValue.trim();
        onChange(val ? set(val) : unset());
        setQuery(null);
        setIsOpen(false);
        if (val && !savedSuggestions.includes(val)) {
          setSavedSuggestions((prev) => [val, ...prev]);
        }
      },
      [onChange, savedSuggestions]
    );

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value;
        setQuery(newVal);
        onChange(newVal ? set(newVal) : unset());
        if (!isOpen) {
          setIsOpen(true);
        }
      },
      [isOpen, onChange]
    );

    const handleClear = useCallback(() => {
      onChange(unset());
      setQuery('');
      setIsOpen(false);
    }, [onChange]);

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (elementProps?.onFocus) {
          elementProps.onFocus(event);
        }
        setIsOpen(true);
      },
      [elementProps]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (elementProps?.onBlur) {
          elementProps.onBlur(event);
        }
        const typed = (event.target.value || '').trim();
        if (typed) {
          onChange(set(typed));
          if (!savedSuggestions.includes(typed)) {
            setSavedSuggestions((prev) => [typed, ...prev]);
          }
        } else {
          onChange(unset());
        }
        setQuery(null);
      },
      [elementProps, onChange, savedSuggestions]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        } else if (event.key === 'ArrowDown' && !isOpen) {
          setIsOpen(true);
          setQuery(null);
        } else if (event.key === 'Enter') {
          setIsOpen(false);
        }
      },
      [isOpen]
    );

    const handleToggleDropdown = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen((prev) => {
        const next = !prev;
        if (next) {
          setQuery(null);
        }
        return next;
      });
    }, []);

    const toggleButton = useMemo(() => {
      if (readOnly) return undefined;

      return (
        <Box padding={1}>
          <Button
            aria-label={isOpen ? 'Hide suggestions' : 'Show suggestions'}
            fontSize={1}
            icon={
              <span
                style={{
                  display: 'inline-flex',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease',
                }}
              >
                <ChevronDownIcon />
              </span>
            }
            mode="bleed"
            padding={2}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={handleToggleDropdown}
          />
        </Box>
      );
    }, [readOnly, isOpen, handleToggleDropdown]);

    const popoverContent = useMemo(() => {
      return (
        <div ref={popoverContentRef}>
          <Card
            padding={1}
            shadow={3}
            radius={2}
            style={{
              maxHeight: '260px',
              overflowY: 'auto',
              minWidth: '220px',
            }}
          >
            {options.length === 0 ? (
              <Box padding={3}>
                <Text size={1} muted>
                  No suggestions
                </Text>
              </Box>
            ) : (
              <Stack space={1}>
                {options.map((option) => {
                  const isSelected = !option.isNew && option.value === (value || '');
                  return (
                    <Button
                      key={option.value}
                      mode="bleed"
                      tone={option.isNew ? 'primary' : 'default'}
                      selected={isSelected}
                      padding={3}
                      radius={2}
                      width="fill"
                      justify="flex-start"
                      style={{ cursor: 'pointer' }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() => handleSelect(option.value)}
                    >
                      <Flex align="center" justify="space-between" style={{ width: '100%' }}>
                        <Text size={1} weight={option.isNew ? 'semibold' : 'regular'}>
                          {option.isNew ? `➕ Use "${option.value}"` : option.value}
                        </Text>
                        {option.isNew && (
                          <Badge tone="primary" fontSize={0} mode="outline">
                            New
                          </Badge>
                        )}
                      </Flex>
                    </Button>
                  );
                })}
              </Stack>
            )}
          </Card>
        </div>
      );
    }, [options, value, handleSelect]);

    return (
      <Box ref={setReferenceElement} style={{ position: 'relative', width: '100%' }}>
        <TextInput
          {...elementProps}
          id={id}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          clearButton={Boolean(displayValue) && !readOnly}
          onClear={handleClear}
          suffix={toggleButton}
        />
        <Popover
          arrow={false}
          constrainSize
          content={popoverContent}
          matchReferenceWidth
          open={isOpen}
          overflow="auto"
          placement="bottom-start"
          portal
          radius={2}
          referenceElement={referenceElement}
        />
      </Box>
    );
  };
}
