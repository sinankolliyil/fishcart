import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useClient } from 'sanity';
import { usePaneRouter } from 'sanity/structure';
import { Card, Flex, Box, Text, Badge, Button, TextInput, Stack, Spinner } from '@sanity/ui';
import { Search, ChevronDown, ChevronRight, Plus, RefreshCw, X } from 'lucide-react';

interface ProductItem {
  _id: string;
  title: string;
  price?: number;
  unit?: string;
  format?: string;
  origin?: string;
  status?: string;
  visibility?: string;
  availabilityStatus?: string;
  visibilityStatus?: string;
  availability?: boolean;
  imageUrl?: string;
  _createdAt?: string;
}

interface CategoryAccordionPaneProps {
  options?: {
    category?: string;
    title?: string;
    singular?: string;
    icon?: string;
    templateId?: string;
  };
}

export function CategoryAccordionPane({ options = {} }: CategoryAccordionPaneProps) {
  const category = options.category || 'fish';
  const categoryTitle = options.title || `${options.singular || 'Fish'} Products`;
  const categoryIcon = options.icon || '🐟';
  const templateId = options.templateId || `product-${category}`;

  const client = useClient({ apiVersion: '2024-03-01' });
  const { navigateIntent, routerPanesState } = usePaneRouter();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Accordion open/close state
  const [outOfStockOpen, setOutOfStockOpen] = useState(true);
  const [hiddenOpen, setHiddenOpen] = useState(true);
  const [allProductsOpen, setAllProductsOpen] = useState(true);

  // Find currently open document ID to highlight it
  const activeDocId = useMemo(() => {
    if (!Array.isArray(routerPanesState)) return null;
    for (const group of routerPanesState) {
      if (Array.isArray(group) && group[0]?.id) {
        return group[0].id;
      } else if (group && typeof group === 'object' && 'id' in group) {
        return (group as any).id;
      }
    }
    return null;
  }, [routerPanesState]);

  // Query to fetch products for this category
  const query = useMemo(() => {
    if (category === 'all') {
      return `*[_type == "product"] | order(title asc) {
        _id,
        title,
        price,
        unit,
        format,
        origin,
        status,
        visibility,
        availabilityStatus,
        visibilityStatus,
        availability,
        "imageUrl": coalesce(image.asset->url, mainImage.asset->url, imageSrc),
        _createdAt
      }`;
    }
    return `*[_type == "product" && (category->slug.current == $category || category == $category)] | order(title asc) {
      _id,
      title,
      price,
      unit,
      format,
      origin,
      status,
      visibility,
      availabilityStatus,
      visibilityStatus,
      availability,
      "imageUrl": coalesce(image.asset->url, mainImage.asset->url, imageSrc),
      _createdAt
    }`;
  }, [category]);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await client.fetch<ProductItem[]>(
        query,
        category === 'all' ? {} : { category }
      );
      setProducts(data || []);
    } catch (err) {
      console.error('Failed to fetch category products:', err);
    } finally {
      setLoading(false);
    }
  }, [client, query, category]);

  useEffect(() => {
    fetchProducts();

    // Listen for live changes
    const subscription = client
      .listen(query, category === 'all' ? {} : { category })
      .subscribe(() => {
        fetchProducts();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProducts, client, query, category]);

  // Categorize products into groups
  const isOutOfStock = (p: ProductItem) => {
    return (
      p.status === 'disabled' ||
      p.availabilityStatus === 'disabled' ||
      p.availabilityStatus === 'unavailable' ||
      p.availability === false
    );
  };

  const isHidden = (p: ProductItem) => {
    return (
      p.visibility === 'hide' ||
      p.visibility === 'hidden' ||
      p.visibilityStatus === 'hidden' ||
      p.visibilityStatus === false ||
      p.visibility === false
    );
  };

  // Filter by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      const titleMatch = (p.title || '').toLowerCase().includes(q);
      const originMatch = (p.origin || '').toLowerCase().includes(q);
      const formatMatch = (p.format || '').toLowerCase().includes(q);
      return titleMatch || originMatch || formatMatch;
    });
  }, [products, searchQuery]);

  const outOfStockList = useMemo(
    () => filteredProducts.filter((p) => isOutOfStock(p)),
    [filteredProducts]
  );

  const hiddenList = useMemo(
    () => filteredProducts.filter((p) => isHidden(p)),
    [filteredProducts]
  );

  const allProductsList = useMemo(
    () => filteredProducts,
    [filteredProducts]
  );

  const handleOpenProduct = (id: string) => {
    navigateIntent('edit', { id, type: 'product' });
  };

  const handleCreateProduct = () => {
    navigateIntent('create', {
      type: 'product',
      template: templateId,
    });
  };

  const renderProductRow = (product: ProductItem) => {
    const isActive = activeDocId === product._id || activeDocId === `drafts.${product._id}`;
    const disabled = isOutOfStock(product);
    const hidden = isHidden(product);

    const priceText =
      typeof product.price === 'number'
        ? `£${product.price.toFixed(2)}${product.unit ? ` / ${product.unit}` : ''}`
        : '';
    const subText = [product.origin, product.format, priceText].filter(Boolean).join(' · ');

    return (
      <Card
        key={product._id}
        padding={2}
        radius={2}
        tone={isActive ? 'primary' : 'default'}
        style={{
          cursor: 'pointer',
          background: isActive
            ? 'rgba(13, 85, 207, 0.22)'
            : 'rgba(255, 255, 255, 0.02)',
          borderLeft: isActive ? '3px solid #3B82F6' : '3px solid transparent',
          transition: 'all 0.15s ease',
          marginBottom: '2px',
        }}
        onClick={() => handleOpenProduct(product._id)}
      >
        <Flex align="center" justify="space-between" gap={3}>
          <Flex align="center" gap={3} style={{ minWidth: 0, flex: 1 }}>
            {/* Thumbnail */}
            <Box
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                overflow: 'hidden',
                background: '#1E293B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '1rem' }}>{categoryIcon}</span>
              )}
            </Box>

            {/* Title & details */}
            <Box style={{ minWidth: 0, flex: 1 }}>
              <Text
                weight="semibold"
                size={1}
                textOverflow="ellipsis"
                style={{
                  color: isActive ? '#FFFFFF' : '#E2E8F0',
                  opacity: disabled ? 0.75 : 1,
                }}
              >
                {product.title || 'Untitled Product'}
              </Text>
              {subText && (
                <Text
                  size={0}
                  textOverflow="ellipsis"
                  style={{ color: '#94A3B8', marginTop: '2px' }}
                >
                  {subText}
                </Text>
              )}
            </Box>
          </Flex>

          {/* Status Tags */}
          <Flex align="center" gap={1} style={{ flexShrink: 0 }}>
            {disabled && (
              <Badge tone="critical" fontSize={0} padding={1}>
                Out of Stock
              </Badge>
            )}
            {hidden && (
              <Badge tone="caution" fontSize={0} padding={1}>
                Hidden
              </Badge>
            )}
            {!disabled && !hidden && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  display: 'inline-block',
                }}
              />
            )}
          </Flex>
        </Flex>
      </Card>
    );
  };

  return (
    <Card
      tone="default"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#0B0F19',
        color: '#E2E8F0',
      }}
    >
      {/* Pane Header */}
      <Box padding={3} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Flex align="center" justify="space-between" gap={2} style={{ marginBottom: '10px' }}>
          <Flex align="center" gap={2}>
            <span style={{ fontSize: '1.25rem' }}>{categoryIcon}</span>
            <Text weight="bold" size={2} style={{ color: '#F8FAFC' }}>
              {categoryTitle}
            </Text>
            <Badge tone="default" fontSize={1}>
              {products.length}
            </Badge>
          </Flex>

          <Button
            fontSize={1}
            padding={2}
            tone="primary"
            icon={<Plus size={16} />}
            text="Add"
            onClick={handleCreateProduct}
            style={{ cursor: 'pointer', fontWeight: 600 }}
          />
        </Flex>

        {/* Search input */}
        <Flex align="center" gap={2}>
          <Box style={{ flex: 1, position: 'relative' }}>
            <TextInput
              fontSize={1}
              icon={<Search size={14} style={{ color: '#94A3B8' }} />}
              placeholder={`Search ${category} products...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            {searchQuery && (
              <Button
                mode="bleed"
                icon={<X size={14} />}
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </Box>
          <Button
            mode="ghost"
            tone="default"
            icon={<RefreshCw size={14} />}
            onClick={() => {
              setLoading(true);
              fetchProducts();
            }}
            title="Refresh list"
          />
        </Flex>
      </Box>

      {/* Pane Content — Scrollable Sections */}
      <Box style={{ flex: 1, overflowY: 'auto' }} padding={2}>
        {loading ? (
          <Flex justify="center" align="center" style={{ height: 160 }}>
            <Spinner />
          </Flex>
        ) : (
          <Stack space={3}>
            {/* ─── SECTION 1: OUT OF STOCK PRODUCTS ─── */}
            <Card
              radius={2}
              tone="default"
              style={{
                background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                overflow: 'hidden',
              }}
            >
              {/* Accordion Header */}
              <Flex
                align="center"
                justify="space-between"
                padding={3}
                onClick={() => setOutOfStockOpen(!outOfStockOpen)}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: outOfStockOpen ? 'rgba(239, 68, 68, 0.08)' : 'transparent',
                }}
              >
                <Flex align="center" gap={2}>
                  <span style={{ fontSize: '1.1rem' }}>🛑</span>
                  <Text weight="bold" size={1} style={{ color: '#FCA5A5' }}>
                    Out of Stock Products
                  </Text>
                  <Badge tone="critical" fontSize={0} padding={1}>
                    {outOfStockList.length}
                  </Badge>
                </Flex>
                {outOfStockOpen ? (
                  <ChevronDown size={16} color="#FCA5A5" />
                ) : (
                  <ChevronRight size={16} color="#FCA5A5" />
                )}
              </Flex>

              {/* Accordion Content — Products right below header */}
              {outOfStockOpen && (
                <Box padding={2} style={{ borderTop: '1px solid rgba(239, 68, 68, 0.15)' }}>
                  {outOfStockList.length === 0 ? (
                    <Box padding={2}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No out of stock products.
                      </Text>
                    </Box>
                  ) : (
                    outOfStockList.map(renderProductRow)
                  )}
                </Box>
              )}
            </Card>

            {/* ─── SECTION 2: HIDDEN PRODUCTS ─── */}
            <Card
              radius={2}
              tone="default"
              style={{
                background: 'rgba(245, 158, 11, 0.06)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                overflow: 'hidden',
              }}
            >
              {/* Accordion Header */}
              <Flex
                align="center"
                justify="space-between"
                padding={3}
                onClick={() => setHiddenOpen(!hiddenOpen)}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: hiddenOpen ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                }}
              >
                <Flex align="center" gap={2}>
                  <span style={{ fontSize: '1.1rem' }}>🚫</span>
                  <Text weight="bold" size={1} style={{ color: '#FCD34D' }}>
                    Hidden Products (Hide)
                  </Text>
                  <Badge tone="caution" fontSize={0} padding={1}>
                    {hiddenList.length}
                  </Badge>
                </Flex>
                {hiddenOpen ? (
                  <ChevronDown size={16} color="#FCD34D" />
                ) : (
                  <ChevronRight size={16} color="#FCD34D" />
                )}
              </Flex>

              {/* Accordion Content — Products right below header */}
              {hiddenOpen && (
                <Box padding={2} style={{ borderTop: '1px solid rgba(245, 158, 11, 0.15)' }}>
                  {hiddenList.length === 0 ? (
                    <Box padding={2}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No hidden products.
                      </Text>
                    </Box>
                  ) : (
                    hiddenList.map(renderProductRow)
                  )}
                </Box>
              )}
            </Card>

            {/* ─── SECTION 3: ALL PRODUCTS ─── */}
            <Card
              radius={2}
              tone="default"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
              }}
            >
              {/* Accordion Header */}
              <Flex
                align="center"
                justify="space-between"
                padding={3}
                onClick={() => setAllProductsOpen(!allProductsOpen)}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: allProductsOpen ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                }}
              >
                <Flex align="center" gap={2}>
                  <span style={{ fontSize: '1.1rem' }}>{categoryIcon}</span>
                  <Text weight="bold" size={1} style={{ color: '#E2E8F0' }}>
                    All {options.singular || 'Fish'} Products
                  </Text>
                  <Badge tone="default" fontSize={0} padding={1}>
                    {allProductsList.length}
                  </Badge>
                </Flex>
                {allProductsOpen ? (
                  <ChevronDown size={16} color="#94A3B8" />
                ) : (
                  <ChevronRight size={16} color="#94A3B8" />
                )}
              </Flex>

              {/* Accordion Content — Products right below header */}
              {allProductsOpen && (
                <Box padding={2} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  {allProductsList.length === 0 ? (
                    <Box padding={2}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No products found.
                      </Text>
                    </Box>
                  ) : (
                    allProductsList.map(renderProductRow)
                  )}
                </Box>
              )}
            </Card>
          </Stack>
        )}
      </Box>
    </Card>
  );
}
