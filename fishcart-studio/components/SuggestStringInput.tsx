import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StringInputProps, set, unset, useClient } from 'sanity';
import { Autocomplete, Card, Text, Box, Flex, Badge } from '@sanity/ui';

interface SuggestOption {
  value: string;
  isNew?: boolean;
}

export function createSuggestStringInput(defaultSuggestions: string[], fieldName: string) {
  return function SuggestStringInput(props: StringInputProps) {
    const { value, onChange, id, readOnly, elementProps } = props;
    const client = useClient({ apiVersion: '2024-01-01' });
    const [savedSuggestions, setSavedSuggestions] = useState<string[]>(defaultSuggestions);
    const [currentQuery, setCurrentQuery] = useState<string>('');

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

    const options: SuggestOption[] = useMemo(() => {
      const trimmedQuery = currentQuery.trim();
      const list = savedSuggestions.map((s) => ({ value: s, isNew: false }));
      if (
        trimmedQuery &&
        !savedSuggestions.some((s) => s.toLowerCase() === trimmedQuery.toLowerCase())
      ) {
        return [{ value: trimmedQuery, isNew: true }, ...list];
      }
      return list;
    }, [savedSuggestions, currentQuery]);

    const handleSelect = useCallback(
      (selectedValue: string) => {
        const val = selectedValue.trim();
        onChange(val ? set(val) : unset());
        setCurrentQuery('');
        if (val && !savedSuggestions.includes(val)) {
          setSavedSuggestions((prev) => [val, ...prev]);
        }
      },
      [onChange, savedSuggestions]
    );

    const handleQueryChange = useCallback(
      (query: string | null) => {
        const val = query ?? '';
        setCurrentQuery(val);
        onChange(val.trim() ? set(val.trim()) : unset());
      },
      [onChange]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (elementProps?.onBlur) elementProps.onBlur(event);
        const typedVal = (event.target.value || '').trim();
        if (typedVal) {
          onChange(set(typedVal));
          if (!savedSuggestions.includes(typedVal)) {
            setSavedSuggestions((prev) => [typedVal, ...prev]);
          }
        }
      },
      [elementProps, onChange, savedSuggestions]
    );

    return (
      <Box>
        <Autocomplete
          id={id}
          value={value || ''}
          options={options}
          openButton
          openOnFocus
          readOnly={readOnly}
          onFocus={elementProps?.onFocus}
          onBlur={handleBlur}
          onQueryChange={handleQueryChange}
          onChange={handleSelect}
          onSelect={handleSelect}
          filterOption={(query, option) => {
            if (option.isNew) return true;
            return option.value.toLowerCase().includes((query || '').trim().toLowerCase());
          }}
          renderOption={(option: SuggestOption) => (
            <Card as="button" padding={3}>
              <Flex align="center" justify="space-between">
                <Text size={1} weight={option.isNew ? 'semibold' : 'regular'}>
                  {option.isNew ? `➕ Add "${option.value}"` : option.value}
                </Text>
                {option.isNew && (
                  <Badge tone="primary" fontSize={0} mode="outline">
                    New
                  </Badge>
                )}
              </Flex>
            </Card>
          )}
        />
      </Box>
    );
  };
}
