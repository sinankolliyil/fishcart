import React, { useState, useEffect } from 'react';
import { useFormValue } from 'sanity';
import { Card, Flex, Box, Text, Button, Stack, Badge } from '@sanity/ui';
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SectionNavProps {
  currentSection: number;
  totalSections?: number;
  currentTitle: string;
  prevGroupTitle: string | null;
  nextGroupTitle: string | null;
}

export function createSectionNav(config: SectionNavProps) {
  return function SectionNavField(_props?: any) {
    const documentValues = useFormValue([]) as Record<string, any> | undefined;
    const [missingFields, setMissingFields] = useState<string[] | null>(null);
    const [isAllFields, setIsAllFields] = useState<boolean>(false);

    useEffect(() => {
      const checkTab = () => {
        try {
          const tabs = Array.from(
            window.document.querySelectorAll<HTMLElement>(
              'button[role="tab"], [role="tab"], [role="tablist"] button, [data-ui="Tab"]'
            )
          );
          const activeTab = tabs.find(
            (t) =>
              t.getAttribute('aria-selected') === 'true' ||
              t.getAttribute('data-selected') === 'true' ||
              t.getAttribute('data-selected') === ''
          );
          if (activeTab) {
            const text = (activeTab.innerText || activeTab.textContent || '').toLowerCase().trim();
            setIsAllFields(text.includes('all fields') || text === 'all');
          }
        } catch {
          // ignore
        }
      };

      checkTab();

      // Observer for DOM attribute changes when tabs are switched
      const observer = new MutationObserver(() => {
        checkTab();
      });

      try {
        observer.observe(window.document.body, {
          attributes: true,
          attributeFilter: ['aria-selected', 'data-selected'],
          subtree: true,
        });
      } catch {
        // ignore
      }

      const handleClick = () => {
        setTimeout(checkTab, 30);
        setTimeout(checkTab, 150);
      };

      // Also a lightweight interval just in case
      const interval = setInterval(checkTab, 300);

      window.document.addEventListener('click', handleClick, true);
      return () => {
        observer.disconnect();
        clearInterval(interval);
        window.document.removeEventListener('click', handleClick, true);
      };
    }, []);

    if (isAllFields) {
      return null;
    }

    const checkMissing = (): string[] => {
      const missing: string[] = [];
      const s = config.currentSection;

      if (s === 1) {
        if (!documentValues?.title || !documentValues.title.trim()) missing.push('Product Title');
        if (!documentValues?.category) missing.push('Product Category');
        if (!documentValues?.image?.asset) missing.push('Product Photo (Image)');
        if (!documentValues?.origin || !documentValues.origin.trim()) missing.push('Origin / Source');
        if (!documentValues?.format || !documentValues.format.trim()) missing.push('Format / Cut Style');
        if (typeof documentValues?.price !== 'number' || documentValues.price <= 0) missing.push('Base Price (£)');
        if (!documentValues?.unit) missing.push('Price Unit');
      } else if (s === 2) {
        if (!documentValues?.description || !documentValues.description.trim()) missing.push('Product Description');
        if (!documentValues?.serves) missing.push('Portion / Serves');
        if (!documentValues?.catchFrom?.location) missing.push('Catch / Origin Location');
        if (!documentValues?.specialty) missing.push('Specialty Highlight');
        if (!documentValues?.famousOn) missing.push('Why Customers Love It');
      } else if (s === 3) {
        if (!Array.isArray(documentValues?.sizes) || documentValues.sizes.length === 0) {
          missing.push('At least 1 Size Option');
        }
      } else if (s === 4) {
        if (!Array.isArray(documentValues?.nutritionInfo) || documentValues.nutritionInfo.length === 0) {
          missing.push('Nutritional Information');
        }
        if (!Array.isArray(documentValues?.goodFor) || documentValues.goodFor.length === 0) {
          missing.push('Health Benefits');
        }
      } else if (s === 5) {
        if (!Array.isArray(documentValues?.allergyInfo) || documentValues.allergyInfo.length === 0) {
          missing.push('Allergen & Storage Information');
        }
      } else if (s === 6) {
        if (!Array.isArray(documentValues?.bestFor) || documentValues.bestFor.length === 0) {
          missing.push('Best Cooking Methods');
        }
        if (!Array.isArray(documentValues?.howToCook) || documentValues.howToCook.length === 0) {
          missing.push('Recipe Video Guides');
        }
      }

      return missing;
    };

    const switchTab = (targetTitle: string) => {
      // Find the tab button by matching text
      const buttons = Array.from(
        window.document.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"], [role="tablist"] button, header button, div[role="tab"]'
        )
      );

      const cleanedTarget = targetTitle.toLowerCase();
      const targetBtn = buttons.find((btn) => {
        const text = (btn.innerText || btn.textContent || '').toLowerCase().trim();
        return (
          text.includes(cleanedTarget) ||
          (cleanedTarget.includes('details') && text.includes('details')) ||
          (cleanedTarget.includes('sizes') && text.includes('sizes')) ||
          (cleanedTarget.includes('nutrition') && text.includes('nutrition')) ||
          (cleanedTarget.includes('allergy') && text.includes('allergy')) ||
          (cleanedTarget.includes('cooking') && text.includes('cooking')) ||
          (cleanedTarget.includes('list') && text.includes('list'))
        );
      });

      if (targetBtn) {
        targetBtn.click();
        targetBtn.focus();
      }

      // Smooth scroll the document pane to top
      setTimeout(() => {
        const scrollContainers = [
          window.document.querySelector('[data-ui="DocumentPane"]'),
          window.document.querySelector('[data-pane-scrollable="true"]'),
          window.document.querySelector('form'),
          window.document.querySelector('main'),
        ];
        for (const el of scrollContainers) {
          if (el && 'scrollTo' in el) {
            el.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    };

    const handleNext = () => {
      if (!config.nextGroupTitle) return;
      const missing = checkMissing();
      if (missing.length > 0) {
        setMissingFields(missing);
        return;
      }
      setMissingFields(null);
      switchTab(config.nextGroupTitle);
    };

    const handleProceedAnyway = () => {
      if (!config.nextGroupTitle) return;
      setMissingFields(null);
      switchTab(config.nextGroupTitle);
    };

    const handlePrev = () => {
      if (!config.prevGroupTitle) return;
      setMissingFields(null);
      switchTab(config.prevGroupTitle);
    };

    const isLastSection = !config.nextGroupTitle;

    return (
      <Card
        padding={4}
        radius={3}
        tone="primary"
        border
        style={{
          marginTop: '24px',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, rgba(20, 30, 50, 0.95), rgba(15, 23, 42, 0.95))',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
        }}
      >
        <Stack space={3}>
          {/* Header indicator */}
          <Flex align="center" gap={2}>
            <Badge tone="primary" fontSize={1} padding={2}>
              Section {config.currentSection} of {config.totalSections || 6}
            </Badge>
            <Text weight="semibold" size={1} style={{ color: '#94A3B8' }}>
              {config.currentTitle}
            </Text>
          </Flex>

          {/* Missing fields alert */}
          {missingFields && missingFields.length > 0 && (
            <Card
              padding={3}
              radius={2}
              tone="caution"
              border
              style={{
                background: 'rgba(234, 88, 12, 0.1)',
                borderColor: 'rgba(249, 115, 22, 0.4)',
              }}
            >
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <AlertCircle size={16} color="#FB923C" />
                  <Text weight="bold" size={1} style={{ color: '#FDBA74' }}>
                    Please fill out the following before moving to next section:
                  </Text>
                </Flex>
                <Box paddingLeft={4}>
                  <Stack space={1}>
                    {missingFields.map((field) => (
                      <Text key={field} size={1} style={{ color: '#FED7AA' }}>
                        • {field}
                      </Text>
                    ))}
                  </Stack>
                </Box>
                <Flex gap={2} style={{ marginTop: '4px' }}>
                  <Button
                    fontSize={1}
                    padding={2}
                    tone="caution"
                    mode="ghost"
                    text="Fix Missing Fields"
                    onClick={() => setMissingFields(null)}
                  />
                  <Button
                    fontSize={1}
                    padding={2}
                    tone="default"
                    mode="ghost"
                    text="Continue to Next Section Anyway →"
                    onClick={handleProceedAnyway}
                  />
                </Flex>
              </Stack>
            </Card>
          )}

          {/* Navigation buttons */}
          <Flex justify="space-between" align="center" gap={3} style={{ paddingTop: '8px' }}>
            {config.prevGroupTitle ? (
              <Button
                fontSize={2}
                padding={3}
                tone="default"
                mode="ghost"
                icon={<ArrowLeft size={16} />}
                text={`Back: ${config.prevGroupTitle.replace(/^\d+\.\s*/, '')}`}
                onClick={handlePrev}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <Box />
            )}

            {!isLastSection ? (
              <Button
                fontSize={2}
                padding={3}
                tone="primary"
                text={`Next: ${config.nextGroupTitle!.replace(/^\d+\.\s*/, '')} →`}
                onClick={handleNext}
                style={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  backgroundColor: '#0D55CF',
                  color: '#FFFFFF',
                }}
              />
            ) : (
              <Flex align="center" gap={2}>
                <CheckCircle2 size={18} color="#10B981" />
                <Text weight="bold" size={1} style={{ color: '#10B981' }}>
                  All Sections Ready — Click "Publish" Below
                </Text>
              </Flex>
            )}
          </Flex>
        </Stack>
      </Card>
    );
  };
}
