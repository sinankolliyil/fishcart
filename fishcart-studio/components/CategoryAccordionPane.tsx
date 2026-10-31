import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useClient } from 'sanity';
import { usePaneRouter } from 'sanity/structure';
import { Card, Flex, Box, Text, Badge, Button, TextInput, Stack, Spinner } from '@sanity/ui';
import { Search, ChevronDown, ChevronUp, Plus, RefreshCw, X } from 'lucide-react';

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
  // Default to 'outOfStock' if there are out of stock items (as shown in user mockup), else 'all'
  const [activeSection, setActiveSection] = useState<ActiveSection>('outOfStock');

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
      if (outOfStockList.length > 0) {
        setActiveSection('outOfStock');
      } else if (hiddenList.length > 0) {
        setActiveSection('hidden');
      } else {
        setActiveSection('all');
      }
    }
  }, [searchQuery, outOfStockList.length, hiddenList.length]);

  const handleToggleSection = (section: ActiveSection) => {
    // Single-open accordion: Clicking another heading hides the previous one
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

  const renderProductCard = (product: ProductItem, parentTone: 'critical' | 'caution' | 'primary') => {
    const isActive = activeDocId === product._id || activeDocId === `drafts.${product._id}`;
    const disabled = isOutOfStock(product);
    const hidden = isHidden(product);

    const priceText =
      typeof product.price === 'number'
        ? `£${product.price.toFixed(2)}${product.unit ? ` / ${product.unit}` : ''}`
        : '';
    const subText = [product.origin, product.format, priceText].filter(Boolean).join(' · ');

    const cardBg = isActive
      ? 'rgba(13, 85, 207, 0.35)'
      : parentTone === 'critical'
      ? '#22141A'
      : parentTone === 'caution'
      ? '#231B12'
      : '#151D2C';

    const cardBorder = isActive
      ? '1px solid #3B82F6'
      : parentTone === 'critical'
      ? '1px solid rgba(239, 68, 68, 0.25)'
      : parentTone === 'caution'
      ? '1px solid rgba(245, 158, 11, 0.25)'
      : '1px solid rgba(255, 255, 255, 0.08)';

    return (
      <Card
        key={product._id}
        padding={2}
        radius={2}
        style={{
          cursor: 'pointer',
          background: cardBg,
          border: cardBorder,
          transition: 'all 0.15s ease',
          marginBottom: '6px',
        }}
        onClick={() => handleOpenProduct(product._id)}
      >
        <Flex align="center" justify="space-between" gap={3}>
          <Flex align="center" gap={3} style={{ minWidth: 0, flex: 1 }}>
            {/* Thumbnail */}
            <Box
              style={{
                width: 36,
                height: 36,
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
                <span style={{ fontSize: '1.1rem' }}>{categoryIcon}</span>
              )}
            </Box>

            {/* Title & details */}
            <Box style={{ minWidth: 0, flex: 1 }}>
              <Text
                weight="bold"
                size={1}
                textOverflow="ellipsis"
                style={{
                  color: isActive ? '#FFFFFF' : '#F1F5F9',
                }}
              >
                {product.title || 'Untitled Product'}
              </Text>
              {subText && (
                <Text
                  size={0}
                  textOverflow="ellipsis"
                  style={{ color: '#94A3B8', marginTop: '3px' }}
                >
                  {subText}
                </Text>
              )}
            </Box>
          </Flex>

          {/* Right Tag */}
          <Flex align="center" gap={1} style={{ flexShrink: 0 }}>
            {disabled && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#F87171',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                }}
              >
                Out of Stock
              </span>
            )}
            {!disabled && hidden && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#FBBF24',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                }}
              >
                Hidden
              </span>
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
      {/* ─── PANE HEADER ─── */}
      <Box padding={3} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Flex align="center" justify="space-between" gap={2} style={{ marginBottom: '12px' }}>
          <Flex align="center" gap={2}>
            <span style={{ fontSize: '1.25rem' }}>{categoryIcon}</span>
            <Text weight="bold" size={2} style={{ color: '#F8FAFC' }}>
              {categoryTitle}
            </Text>
            <span
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#CBD5E1',
              }}
            >
              {products.length}
            </span>
          </Flex>

          <Button
            fontSize={1}
            padding={2}
            tone="primary"
            icon={<Plus size={16} />}
            text={`Add ${singular}`}
            onClick={handleCreateProduct}
            style={{
              cursor: 'pointer',
              fontWeight: 700,
              backgroundColor: '#0D55CF',
              color: '#FFFFFF',
              borderRadius: '6px',
            }}
          />
        </Flex>

        {/* Search list bar */}
        <Flex align="center" gap={2}>
          <Box style={{ flex: 1, position: 'relative' }}>
            <TextInput
              fontSize={1}
              icon={<Search size={14} style={{ color: '#94A3B8' }} />}
              placeholder={`Search ${singular.toLowerCase()} products...`}
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

      {/* ─── PANE BODY: THE 3 MAIN HEADINGS ─── */}
      <Box style={{ flex: 1, overflowY: 'auto' }} padding={3}>
        {loading ? (
          <Flex justify="center" align="center" style={{ height: 160 }}>
            <Spinner />
          </Flex>
        ) : (
          <Stack space={3}>
            {/* ═══════════════════════════════════════════════
                1. OUT OF STOCK PRODUCTS
               ═══════════════════════════════════════════════ */}
            <Box
              style={{
                borderRadius: '8px',
                border:
                  activeSection === 'outOfStock'
                    ? '1px solid rgba(239, 68, 68, 0.45)'
                    : '1px solid rgba(239, 68, 68, 0.25)',
                background:
                  activeSection === 'outOfStock' ? '#1A1015' : 'rgba(239, 68, 68, 0.04)',
                overflow: 'hidden',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Header row */}
              <Flex
                align="center"
                justify="space-between"
                padding={3}
                onClick={() => handleToggleSection('outOfStock')}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background:
                    activeSection === 'outOfStock'
                      ? 'rgba(239, 68, 68, 0.12)'
                      : 'transparent',
                }}
              >
                <Flex align="center" gap={3}>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: '#EF4444',
                      display: 'inline-block',
                      boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                    }}
                  />
                  <Text weight="bold" size={1} style={{ color: '#FFFFFF' }}>
                    Out of Stock Products
                  </Text>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '1px 7px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                    }}
                  >
                    {outOfStockList.length}
                  </span>
                </Flex>

                {activeSection === 'outOfStock' ? (
                  <ChevronUp size={16} color="#FCA5A5" />
                ) : (
                  <ChevronDown size={16} color="#94A3B8" />
                )}
              </Flex>

              {/* Expands directly downwards inside this list pane */}
              {activeSection === 'outOfStock' && (
                <Box
                  padding={2}
                  style={{
                    borderTop: '1px solid rgba(239, 68, 68, 0.2)',
                    background: '#150D11',
                  }}
                >
                  {outOfStockList.length === 0 ? (
                    <Box padding={3}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No out of stock products in {categoryTitle}.
                      </Text>
                    </Box>
                  ) : (
                    outOfStockList.map((p) => renderProductCard(p, 'critical'))
                  )}
                </Box>
              )}
            </Box>

            {/* ═══════════════════════════════════════════════
                2. HIDDEN PRODUCTS (HIDE)
               ═══════════════════════════════════════════════ */}
            <Box
              style={{
                borderRadius: '8px',
                border:
                  activeSection === 'hidden'
                    ? '1px solid rgba(245, 158, 11, 0.45)'
                    : '1px solid rgba(245, 158, 11, 0.25)',
                background:
                  activeSection === 'hidden' ? '#1C1810' : 'rgba(245, 158, 11, 0.04)',
                overflow: 'hidden',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Header row */}
              <Flex
                align="center"
                justify="space-between"
                padding={3}
                onClick={() => handleToggleSection('hidden')}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background:
                    activeSection === 'hidden'
                      ? 'rgba(245, 158, 11, 0.12)'
                      : 'transparent',
                }}
              >
                <Flex align="center" gap={3}>
                  <span style={{ fontSize: '1.1rem' }}>🚫</span>
                  <Text weight="bold" size={1} style={{ color: '#FFFFFF' }}>
                    Hidden Products (Hide)
                  </Text>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '1px 7px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: '#F59E0B',
                      color: '#000000',
                    }}
                  >
                    {hiddenList.length}
                  </span>
                </Flex>

                {activeSection === 'hidden' ? (
                  <ChevronUp size={16} color="#FCD34D" />
                ) : (
                  <ChevronDown size={16} color="#94A3B8" />
                )}
              </Flex>

              {/* Expands directly downwards inside this list pane */}
              {activeSection === 'hidden' && (
                <Box
                  padding={2}
                  style={{
                    borderTop: '1px solid rgba(245, 158, 11, 0.2)',
                    background: '#14110A',
                  }}
                >
                  {hiddenList.length === 0 ? (
                    <Box padding={3}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No hidden products in {categoryTitle}.
                      </Text>
                    </Box>
                  ) : (
                    hiddenList.map((p) => renderProductCard(p, 'caution'))
                  )}
                </Box>
              )}
            </Box>

            {/* ═══════════════════════════════════════════════
                3. ALL PRODUCTS
               ═══════════════════════════════════════════════ */}
            <Box
              style={{
                borderRadius: '8px',
                border:
                  activeSection === 'all'
                    ? '1px solid rgba(59, 130, 246, 0.45)'
                    : '1px solid rgba(59, 130, 246, 0.22)',
                background:
                  activeSection === 'all' ? '#101626' : 'rgba(59, 130, 246, 0.04)',
                overflow: 'hidden',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Header row */}
              <Flex
                align="center"
                justify="space-between"
                padding={3}
                onClick={() => handleToggleSection('all')}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  background:
                    activeSection === 'all'
                      ? 'rgba(59, 130, 246, 0.12)'
                      : 'transparent',
                }}
              >
                <Flex align="center" gap={3}>
                  <span style={{ fontSize: '1.15rem' }}>{categoryIcon}</span>
                  <Text weight="bold" size={1} style={{ color: '#FFFFFF' }}>
                    All {singular} Products
                  </Text>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '1px 7px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: '#3B82F6',
                      color: '#FFFFFF',
                    }}
                  >
                    {allProductsList.length}
                  </span>
                </Flex>

                {activeSection === 'all' ? (
                  <ChevronUp size={16} color="#60A5FA" />
                ) : (
                  <ChevronDown size={16} color="#94A3B8" />
                )}
              </Flex>

              {/* Expands directly downwards inside this list pane */}
              {activeSection === 'all' && (
                <Box
                  padding={2}
                  style={{
                    borderTop: '1px solid rgba(59, 130, 246, 0.2)',
                    background: '#0D121F',
                  }}
                >
                  {allProductsList.length === 0 ? (
                    <Box padding={3}>
                      <Text size={1} style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No products found.
                      </Text>
                    </Box>
                  ) : (
                    allProductsList.map((p) => renderProductCard(p, 'primary'))
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
