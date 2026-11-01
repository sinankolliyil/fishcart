import React, { useCallback } from 'react';
import type { ArrayOfObjectsInputProps } from 'sanity';
import { set } from 'sanity';
import { Box, Card, Flex, Text, Badge, Button, Stack } from '@sanity/ui';
import styled from 'styled-components';

export const DEFAULT_PRODUCT_SIZES = [
  {
    _key: 'size-small',
    id: 'small',
    label: 'Small',
    subLabel: '(500g - 1kg)',
  },
  {
    _key: 'size-medium',
    id: 'medium',
    label: 'Medium',
    subLabel: '(1kg - 2kg)',
  },
  {
    _key: 'size-large',
    id: 'large',
    label: 'Large',
    subLabel: '(2kg - 3kg)',
  },
  {
    _key: 'size-xl',
    id: 'xl',
    label: 'Extra Large',
    subLabel: '(3kg+)',
  },
];

const SizesWrapper = styled(Box)<{ $isMax: boolean }>`
  ${({ $isMax }) =>
    $isMax &&
    `
    /* When 4 or more sizes exist, completely hide the "+ Add item" button */
    button[data-testid="add-single-object-button"],
    button[data-testid="add-multiple-object-button"],
    button[data-testid="add-read-object-button"],
    button:has(svg[data-sanity-icon="add"]),
    [data-ui="ArrayInputFooter"],
    [data-testid="array-input-footer"] {
      display: none !important;
    }
  `}
`;

export function SizesArrayInput(props: ArrayOfObjectsInputProps) {
  const count = Array.isArray(props.value) ? props.value.length : 0;
  const isMax = count >= 4;

  const handleResetToStandard = useCallback(() => {
    props.onChange(set(DEFAULT_PRODUCT_SIZES));
  }, [props]);

  return (
    <SizesWrapper $isMax={isMax}>
      <Card
        padding={3}
        radius={2}
        tone={count === 4 ? 'positive' : count > 4 ? 'critical' : 'caution'}
        marginBottom={3}
        border
      >
        <Flex justify="space-between" align="center" gap={3} wrap="wrap">
          <Stack space={2}>
            <Flex align="center" gap={2}>
              <Badge
                tone={count === 4 ? 'positive' : count > 4 ? 'critical' : 'caution'}
                mode="outline"
                fontSize={1}
              >
                {count} / 4 Sizes
              </Badge>
              <Text size={1} weight="semibold">
                {count === 4
                  ? '4 Fixed Sizes (Small, Medium, Large, Extra Large)'
                  : count > 4
                  ? 'Too Many Sizes (Maximum 4 Allowed)'
                  : 'Requires 4 Fixed Sizes'}
              </Text>
            </Flex>
            <Text size={1} muted>
              {count === 4
                ? 'These 4 sizes are fixed. Click any size below to edit its label text, sub-label (weight/portion), or price. Adding more than 4 is strictly disabled.'
                : count > 4
                ? 'This product has more than 4 sizes. Click "Reset to 4 Fixed Sizes" or remove extra sizes to continue.'
                : 'Keep only 4 sizes: Small, Medium, Large, Extra Large. Click "Load 4 Fixed Sizes" to populate.'}
            </Text>
          </Stack>
          {count !== 4 && (
            <Button
              fontSize={1}
              padding={2}
              tone={count > 4 ? 'critical' : 'primary'}
              mode="ghost"
              text={count > 4 ? 'Reset to 4 Fixed Sizes' : 'Load 4 Fixed Sizes'}
              onClick={handleResetToStandard}
            />
          )}
        </Flex>
      </Card>
      {props.renderDefault(props)}
    </SizesWrapper>
  );
}
