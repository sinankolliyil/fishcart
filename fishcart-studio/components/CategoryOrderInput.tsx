import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { NumberInputProps } from 'sanity';
import { set, useClient, useFormValue } from 'sanity';
import { Card, Flex, Box, Text, Badge, Button, TextInput, Stack, Spinner, useToast } from '@sanity/ui';
import { ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, ListOrdered, RefreshCw, Check } from 'lucide-react';

interface RecipeSibling {
  baseId: string;
  publishedId?: string;
  draftId?: string;
  title: string;
  displayOrder: number;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  Fish: '🐟',
  Meat: '🥩',
  Chicken: '🍗',
  Egg: '🥚',
};

export function CategoryOrderInput(props: NumberInputProps) {
  const { value, onChange, readOnly } = props;
  const currentOrder = typeof value === 'number' ? value : undefined;

  const category = (useFormValue(['category']) as string) || 'Fish';
  const docId = (useFormValue(['_id']) as string) || '';
  const currentBaseId = docId.replace(/^drafts\./, '');

  const client = useClient({ apiVersion: '2024-01-01' });
  const toast = useToast();

  const [siblings, setSiblings] = useState<RecipeSibling[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>(currentOrder !== undefined ? String(currentOrder) : '');
  const [showQueue, setShowQueue] = useState<boolean>(false);

  // Sync inputVal when external value changes
  useEffect(() => {
    if (currentOrder !== undefined) {
      setInputVal(String(currentOrder));
    } else {
      setInputVal('');
    }
  }, [currentOrder]);

  // Fetch sibling recipes for this category
  const loadSiblings = useCallback(async () => {
    setIsLoading(true);
    try {
      const raw = await client.fetch<Array<{
        _id: string;
        title?: string;
        displayOrder?: number;
        _updatedAt?: string;
      }>>(
        `*[_type == "recipe" && category == $category]{
          _id,
          title,
          displayOrder,
          _updatedAt
        }`,
        { category }
      );

      // Deduplicate drafts & published
      const map = new Map<string, { published?: typeof raw[0]; draft?: typeof raw[0] }>();
      for (const item of raw) {
        const isDraft = item._id.startsWith('drafts.');
        const base = isDraft ? item._id.replace(/^drafts\./, '') : item._id;
        const entry = map.get(base) || {};
        if (isDraft) entry.draft = item;
        else entry.published = item;
        map.set(base, entry);
      }

      const list: RecipeSibling[] = [];
      for (const [base, entry] of map.entries()) {
        if (base === currentBaseId) continue; // Exclude current doc from siblings
        const active = entry.draft || entry.published!;
        list.push({
          baseId: base,
          publishedId: entry.published?._id,
          draftId: entry.draft?._id,
          title: active.title || 'Untitled Recipe',
          displayOrder: typeof active.displayOrder === 'number' ? active.displayOrder : 999,
        });
      }

      list.sort((a, b) => a.displayOrder - b.displayOrder);
      setSiblings(list);
    } catch (err) {
      console.error('Failed to load category siblings:', err);
    } finally {
      setIsLoading(false);
    }
  }, [client, category, currentBaseId]);

  useEffect(() => {
    loadSiblings();
  }, [loadSiblings]);

  const totalInCat = siblings.length + 1; // including current item

  // Apply cascading shift to reorder siblings
  const applyNewOrder = useCallback(
    async (targetOrder: number) => {
      if (readOnly || isUpdating) return;
      // Clamp targetOrder
      const clampedOrder = Math.max(1, Math.min(targetOrder, totalInCat));
      if (clampedOrder === currentOrder) return;

      setIsUpdating(true);
      try {
        const tx = client.transaction();
        let shiftCount = 0;

        if (currentOrder !== undefined) {
          if (clampedOrder < currentOrder) {
            // Moving UP (e.g. from 3 to 1):
            // Sibling items in [clampedOrder .. currentOrder - 1] step DOWN (+1)
            for (const s of siblings) {
              if (s.displayOrder >= clampedOrder && s.displayOrder < currentOrder) {
                const nextVal = s.displayOrder + 1;
                shiftCount++;
                if (s.publishedId) tx.patch(s.publishedId, (p) => p.set({ displayOrder: nextVal }));
                if (s.draftId) tx.patch(s.draftId, (p) => p.set({ displayOrder: nextVal }));
              }
            }
          } else {
            // Moving DOWN (e.g. from 1 to 3):
            // Sibling items in [currentOrder + 1 .. clampedOrder] step UP (-1)
            for (const s of siblings) {
              if (s.displayOrder > currentOrder && s.displayOrder <= clampedOrder) {
                const nextVal = s.displayOrder - 1;
                shiftCount++;
                if (s.publishedId) tx.patch(s.publishedId, (p) => p.set({ displayOrder: nextVal }));
                if (s.draftId) tx.patch(s.draftId, (p) => p.set({ displayOrder: nextVal }));
              }
            }
          }
        } else {
          // New document inserting at clampedOrder:
          // All siblings >= clampedOrder step DOWN (+1)
          for (const s of siblings) {
            if (s.displayOrder >= clampedOrder) {
              const nextVal = s.displayOrder + 1;
              shiftCount++;
              if (s.publishedId) tx.patch(s.publishedId, (p) => p.set({ displayOrder: nextVal }));
              if (s.draftId) tx.patch(s.draftId, (p) => p.set({ displayOrder: nextVal }));
            }
          }
        }

        if (shiftCount > 0) {
          await tx.commit();
        }

        // Update form value for current document
        onChange(set(clampedOrder));
        setInputVal(String(clampedOrder));

        toast.push({
          status: 'success',
          title: `Position #${clampedOrder} set in ${category}`,
          description:
            shiftCount > 0
              ? `${shiftCount} sibling recipe(s) stepped down/up automatically.`
              : 'Position updated.',
        });

        // Refresh siblings
        await loadSiblings();
      } catch (err: any) {
        console.error('Failed to update recipe order:', err);
        toast.push({
          status: 'error',
          title: 'Failed to update order',
          description: err.message || 'Sanity transaction failed.',
        });
      } finally {
        setIsUpdating(false);
      }
    },
    [client, category, currentOrder, siblings, totalInCat, onChange, readOnly, isUpdating, toast, loadSiblings]
  );

  const handleCommit = useCallback(() => {
    const num = parseInt(inputVal.trim(), 10);
    if (!isNaN(num)) {
      applyNewOrder(num);
    } else if (currentOrder !== undefined) {
      setInputVal(String(currentOrder));
    }
  }, [inputVal, currentOrder, applyNewOrder]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommit();
    }
  };

  // Full preview list including this document at its active position
  const fullQueue = useMemo(() => {
    const activeNum = currentOrder ?? totalInCat;
    const all = [
      ...siblings.map((s) => ({
        id: s.baseId,
        title: s.title,
        order: s.displayOrder,
        isCurrent: false,
      })),
      {
        id: currentBaseId || 'current',
        title: '👉 (This Recipe)',
        order: activeNum,
        isCurrent: true,
      },
    ];
    all.sort((a, b) => a.order - b.order);
    return all;
  }, [siblings, currentOrder, totalInCat, currentBaseId]);

  const emoji = CATEGORY_EMOJIS[category] || '🍳';

  return (
    <Stack space={3}>
      {/* Status banner */}
      <Card padding={3} radius={2} tone="primary" border>
        <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
          <Flex align="center" gap={2}>
            <Text size={3}>{emoji}</Text>
            <Stack space={1}>
              <Flex align="center" gap={2}>
                <Text weight="bold" size={1}>
                  {category} Recipe Queue
                </Text>
                <Badge tone="primary">
                  {currentOrder !== undefined ? `#${currentOrder} of ${totalInCat}` : `New (#${totalInCat})`}
                </Badge>
              </Flex>
              <Text size={0} muted>
                Independent ordering: #{currentOrder || totalInCat} will show in this position under {category}.
              </Text>
            </Stack>
          </Flex>

          <Button
            fontSize={1}
            padding={2}
            mode="bleed"
            tone="default"
            icon={RefreshCw}
            disabled={isLoading || isUpdating}
            onClick={loadSiblings}
            title="Refresh order queue"
          />
        </Flex>
      </Card>

      {/* Main input & quick reorder controls */}
      <Flex gap={2} align="center">
        <Box style={{ width: '110px' }}>
          <TextInput
            type="number"
            min={1}
            max={totalInCat}
            value={inputVal}
            readOnly={readOnly || isUpdating}
            onChange={(e) => setInputVal((e.target as HTMLInputElement).value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            style={{ fontWeight: 'bold', fontSize: '15px' }}
          />
        </Box>

        {/* Stepper buttons */}
        <Flex gap={1}>
          <Button
            fontSize={1}
            padding={2}
            mode="ghost"
            icon={ChevronUp}
            text="Up"
            disabled={readOnly || isUpdating || !currentOrder || currentOrder <= 1}
            onClick={() => applyNewOrder((currentOrder || 2) - 1)}
            title="Move up one position"
          />
          <Button
            fontSize={1}
            padding={2}
            mode="ghost"
            icon={ChevronDown}
            text="Down"
            disabled={readOnly || isUpdating || !currentOrder || currentOrder >= totalInCat}
            onClick={() => applyNewOrder((currentOrder || 1) + 1)}
            title="Move down one position"
          />
        </Flex>

        {/* Jump buttons */}
        <Flex gap={1}>
          <Button
            fontSize={1}
            padding={2}
            mode="ghost"
            tone="positive"
            icon={ChevronsUp}
            text="#1 Top"
            disabled={readOnly || isUpdating || currentOrder === 1}
            onClick={() => applyNewOrder(1)}
            title={`Make this the #1 video in ${category} (steps all others down)`}
          />
          <Button
            fontSize={1}
            padding={2}
            mode="ghost"
            icon={ChevronsDown}
            text={`#${totalInCat} End`}
            disabled={readOnly || isUpdating || currentOrder === totalInCat}
            onClick={() => applyNewOrder(totalInCat)}
            title={`Move to the last position in ${category}`}
          />
        </Flex>

        {isUpdating && (
          <Flex align="center" gap={2}>
            <Spinner size={1} />
            <Text size={1} muted>
              Shifting...
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Queue Drawer Toggle */}
      <Box>
        <Button
          fontSize={1}
          padding={2}
          mode="bleed"
          icon={ListOrdered}
          text={showQueue ? `Hide ${category} Order List` : `View All ${category} Videos (${totalInCat})`}
          onClick={() => setShowQueue(!showQueue)}
        />
      </Box>

      {/* Expanded visual queue list */}
      {showQueue && (
        <Card padding={3} radius={2} border tone="transparent" style={{ maxHeight: '280px', overflowY: 'auto' }}>
          <Stack space={2}>
            <Text size={1} weight="semibold" muted>
              Current Order in {category}:
            </Text>
            {fullQueue.map((item, idx) => (
              <Flex
                key={item.id}
                align="center"
                justify="space-between"
                padding={2}
                style={{
                  borderRadius: '4px',
                  backgroundColor: item.isCurrent ? 'rgba(13, 85, 207, 0.1)' : 'transparent',
                  border: item.isCurrent ? '1px solid rgba(13, 85, 207, 0.4)' : '1px solid transparent',
                }}
              >
                <Flex align="center" gap={2}>
                  <Badge tone={item.isCurrent ? 'primary' : 'default'} style={{ minWidth: '32px', textAlign: 'center' }}>
                    #{item.order}
                  </Badge>
                  <Text size={1} weight={item.isCurrent ? 'bold' : 'regular'}>
                    {item.title}
                  </Text>
                </Flex>
                {item.isCurrent && (
                  <Badge tone="positive" fontSize={0}>
                    <Check size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    Editing This
                  </Badge>
                )}
              </Flex>
            ))}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
