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

type ActiveSection = 'outOfStock' | 'hidden' | 'all' | null;

export function CategoryAccordionPane({ options = {} }: CategoryAccordionPaneProps) {
  const category = options.category || 'fish';
  const categoryTitle = options.title || `${options.singular || 'Fish'} Products`;
  const categoryIcon = options.icon || '🐟';
  const singular = options.singular || 'Fish';
  const templateId = options.templateId || `product-${category}`;

  const client = useClient({ apiVersion: '2024-03-01' });
  const { navigateIntent, routerPanesState } = usePaneRouter();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Single-open accordion state: only ONE section open at a time
  // When another heading is clicked, the previous one hides back
  const [activeSection, setActiveSection] = useState<ActiveSection>('all');

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

    // Listen for live updates
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

  // If user is searching, automatically open the section that has matches
  useEffect(() => {
    if (searchQuery.trim()) {
      if (outOfStockList.length > 0 && activeSection !== 'outOfStock') {
        setActiveSection('outOfStock');
      } else if (hiddenList.length > 0 && activeSection !== 'hidden') {
        setActiveSection('hidden');
      } else {
        setActiveSection('all');
      }
    }
  }, [searchQuery]);

  const handleToggleSection = (section: ActiveSection) => {
    // If clicking the currently open section, close it. Otherwise open it and close the others.
    setActiveSection((current) => (current === section ? null : section));
  };

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
            ? 'rgba(13, 85, 207, 0.28)'
            : 'rgba(255, 255, 255, 0.03)',
          borderLeft: isActive ? '3px solid #3B82F6' : '3px solid transparent',
          transition: 'all 0.15s ease',
          marginBottom: '3px',
          marginLeft: '4px',
          marginRight: '4px',
        }}
        onClick={() => handleOpenProduct(product._id)}
      >
        <Flex align="center" justify="space-between" gap={3}>
          <Flex align="center" gap={3} style={{ minWidth: 0, flex: 1 }}>
            {/* Thumbnail */}
            <Box
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
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
                <span style={{ fontSize: '0.9rem' }}>{categoryIcon}</span>
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
                  opacity: disabled ? 0.8 : 1,
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
              <>
                <Badge tone="critical" fontSize={0} padding={1}>
                  Out of Stock
                </Badge>
                {hidden ? (
                  <Badge tone="caution" fontSize={0} padding={1}>
                    Hidden
                  </Badge>
                ) : (
                  <Badge tone="primary" fontSize={0} padding={1}>
                    Shown
                  </Badge>
                )}
              </>
            )}
            {!disabled && hidden && (
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
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Pane Top Header — matches Sanity Studio pane header */}
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

        {/* Search list bar */}
        <Flex align="center" gap={2}>
          <Box style={{ flex: 1, position: 'relative' }}>
            <TextInput
              fontSize={1}
              icon={<Search size={14} style={{ color: '#94A3B8' }} />}
              placeholder={`Search list...`}
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

      {/* Pane Content — The 3 Main Headings (Single-Open Accordion) */}
      <Box style={{ flex: 1, overflowY: 'auto' }} padding={2}>
        {loading ? (
          <Flex justify="center" align="center" style={{ height: 160 }}>
            <Spinner />
          </Flex>
        ) : (
          <Stack space={1}>
            {/* ═══════════════════════════════════════════════
                HEADING 1: OUT OF STOCK PRODUCTS
               ═══════════════════════════════════════════════ */}
            <Box style={{ marginBottom: '4px' }}>
              {/* Main Heading Row — Styled like native Sanity list row */}
              <Card
                padding={3}
                radius={2}
                tone={activeSection === 'outOfStock' ? 'critical' : 'default'}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background:
                    activeSection === 'outOfStock'
                      ? 'rgba(239, 68, 68, 0.16)'
                      : 'rgba(255, 255, 255, 0.02)',
                  border:
                    activeSection === 'outOfStock'
                      ? '1px solid rgba(239, 68, 68, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => handleToggleSection('outOfStock')}
              >
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={3}>
                    <span style={{ fontSize: '1.15rem' }}>🛑</span>
                    <Text
                      weight="bold"
                      size={1}
                      style={{
                        color: activeSection === 'outOfStock' ? '#FCA5A5' : '#E2E8F0',
                      }}
                    >
                      Out of Stock Products
                    </Text>
                  </Flex>

                  <Flex align="center" gap={2}>
                    <Badge tone="critical" fontSize={0} padding={1}>
                      {outOfStockList.length}
                    </Badge>
                    {activeSection === 'outOfStock' ? (
                      <ChevronDown size={16} color="#FCA5A5" />
                    ) : (
                      <ChevronRight size={16} color="#94A3B8" />
                    )}
                  </Flex>
                </Flex>
              </Card>

              {/* Expands directly downwards inside the same list pane */}
              {activeSection === 'outOfStock' && (
                <Box
                  padding={2}
                  style={{
                    background: 'rgba(239, 68, 68, 0.04)',
                    borderLeft: '2px solid rgba(239, 68, 68, 0.35)',
                    borderRight: '1px solid rgba(239, 68, 68, 0.15)',
                    borderBottom: '1px solid rgba(239, 68, 68, 0.15)',
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                    marginTop: '2px',
                    marginBottom: '6px',
                  }}
                >
                  {outOfStockList.length === 0 ? (
                    <Box padding={3}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No out of stock products in {categoryTitle}.
                      </Text>
                    </Box>
                  ) : (
                    outOfStockList.map(renderProductRow)
                  )}
                </Box>
              )}
            </Box>

            {/* ═══════════════════════════════════════════════
                HEADING 2: HIDDEN PRODUCTS (HIDE)
               ═══════════════════════════════════════════════ */}
            <Box style={{ marginBottom: '4px' }}>
              {/* Main Heading Row */}
              <Card
                padding={3}
                radius={2}
                tone={activeSection === 'hidden' ? 'caution' : 'default'}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background:
                    activeSection === 'hidden'
                      ? 'rgba(245, 158, 11, 0.16)'
                      : 'rgba(255, 255, 255, 0.02)',
                  border:
                    activeSection === 'hidden'
                      ? '1px solid rgba(245, 158, 11, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => handleToggleSection('hidden')}
              >
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={3}>
                    <span style={{ fontSize: '1.15rem' }}>🚫</span>
                    <Text
                      weight="bold"
                      size={1}
                      style={{
                        color: activeSection === 'hidden' ? '#FCD34D' : '#E2E8F0',
                      }}
                    >
                      Hidden Products (Hide)
                    </Text>
                  </Flex>

                  <Flex align="center" gap={2}>
                    <Badge tone="caution" fontSize={0} padding={1}>
                      {hiddenList.length}
                    </Badge>
                    {activeSection === 'hidden' ? (
                      <ChevronDown size={16} color="#FCD34D" />
                    ) : (
                      <ChevronRight size={16} color="#94A3B8" />
                    )}
                  </Flex>
                </Flex>
              </Card>

              {/* Expands directly downwards inside the same list pane */}
              {activeSection === 'hidden' && (
                <Box
                  padding={2}
                  style={{
                    background: 'rgba(245, 158, 11, 0.04)',
                    borderLeft: '2px solid rgba(245, 158, 11, 0.35)',
                    borderRight: '1px solid rgba(245, 158, 11, 0.15)',
                    borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                    marginTop: '2px',
                    marginBottom: '6px',
                  }}
                >
                  {hiddenList.length === 0 ? (
                    <Box padding={3}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No hidden products in {categoryTitle}.
                      </Text>
                    </Box>
                  ) : (
                    hiddenList.map(renderProductRow)
                  )}
                </Box>
              )}
            </Box>

            {/* ═══════════════════════════════════════════════
                HEADING 3: ALL PRODUCTS
               ═══════════════════════════════════════════════ */}
            <Box style={{ marginBottom: '4px' }}>
              {/* Main Heading Row */}
              <Card
                padding={3}
                radius={2}
                tone={activeSection === 'all' ? 'primary' : 'default'}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background:
                    activeSection === 'all'
                      ? 'rgba(13, 85, 207, 0.22)'
                      : 'rgba(255, 255, 255, 0.02)',
                  border:
                    activeSection === 'all'
                      ? '1px solid rgba(59, 130, 246, 0.45)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => handleToggleSection('all')}
              >
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={3}>
                    <span style={{ fontSize: '1.15rem' }}>{categoryIcon}</span>
                    <Text
                      weight="bold"
                      size={1}
                      style={{
                        color: activeSection === 'all' ? '#60A5FA' : '#E2E8F0',
                      }}
                    >
                      All {singular} Products
                    </Text>
                  </Flex>

                  <Flex align="center" gap={2}>
                    <Badge tone="default" fontSize={0} padding={1}>
                      {allProductsList.length}
                    </Badge>
                    {activeSection === 'all' ? (
                      <ChevronDown size={16} color="#60A5FA" />
                    ) : (
                      <ChevronRight size={16} color="#94A3B8" />
                    )}
                  </Flex>
                </Flex>
              </Card>

              {/* Expands directly downwards inside the same list pane */}
              {activeSection === 'all' && (
                <Box
                  padding={2}
                  style={{
                    background: 'rgba(59, 130, 246, 0.03)',
                    borderLeft: '2px solid rgba(59, 130, 246, 0.35)',
                    borderRight: '1px solid rgba(59, 130, 246, 0.15)',
                    borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                    marginTop: '2px',
                    marginBottom: '6px',
                  }}
                >
                  {allProductsList.length === 0 ? (
                    <Box padding={3}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No products found.
                      </Text>
                    </Box>
                  ) : (
                    allProductsList.map(renderProductRow)
                  )}
                </Box>
              )}
            </Box>
          </Stack>
        )}
      </Box>
    </Card>
  );
}
