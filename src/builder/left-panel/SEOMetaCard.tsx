'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { RADIUS, SPACING } from '@/lib/constants/glassUI';
import { Label, Input, Textarea, HelperText, Select, Toggle } from '@/builder/components/section-settings/FormControls';

const Card = styled.div`
  ${(p) => p.theme.glass.card}
  border-radius: ${RADIUS.lg};
  padding: 22px;
  margin-bottom: 18px;
  &:hover {
    ${(p) => p.theme.glass.cardHover}
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.sm}px;
  margin-bottom: ${SPACING.xs}px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  line-height: 1.3;
`;

const Subtitle = styled.p`
  margin: ${SPACING.xs}px 0 0;
  font-size: 14px;
  font-weight: 400;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const Collapsible = styled.div`
  background: ${(p) => p.theme.shellBg};
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.md};
  margin-top: ${SPACING.md}px;
  overflow: hidden;
`;

const CollapsibleHeader = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.sm}px;
  padding: ${SPACING.sm}px ${SPACING.md}px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  text-align: left;

  &:hover {
    background: ${(p) => p.theme.rowHover};
  }
`;

const CollapsibleIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.muted};
`;

const Chevron = styled.span<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.muted};
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.2s ease;
`;

const CollapsibleBody = styled.div`
  padding: 0 ${SPACING.md}px ${SPACING.md}px;
`;

const Field = styled.div`
  margin-top: ${SPACING.md}px;

  &:first-child {
    margin-top: ${SPACING.sm}px;
  }
`;

const CharCount = styled.span`
  font-size: 12px;
  color: ${(p) => p.theme.muted};
  margin-left: ${SPACING.xs}px;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${SPACING.xs}px;
`;

const ToggleField = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${SPACING.md}px;
  margin-top: ${SPACING.md}px;
`;

const ToggleLabelBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToggleLabelText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.theme.heading};
`;

const ToggleDesc = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.muted};
  margin-top: ${SPACING.xxs}px;
  line-height: 1.4;
`;

const BulletList = styled.ul`
  margin: ${SPACING.sm}px 0 0;
  padding-left: ${SPACING.lg}px;
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  line-height: 1.6;
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: ${RADIUS.full};
  background: ${(p) => p.theme.rowHover};
  color: ${(p) => p.theme.body};
  margin-left: ${SPACING.xs}px;
`;

function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ShareIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function CodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ChevronUp({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

const META_TITLE_MAX = 60;
const META_DESC_MAX = 160;
const TWITTER_CARD_OPTIONS = [
  { value: 'summary', label: 'Summary' },
  { value: 'summary_large_image', label: 'Summary with Large Image' },
  { value: 'app', label: 'App' },
  { value: 'player', label: 'Player' },
];

export default function SEOMetaCard() {
  const [seoOpen, setSeoOpen] = useState(true);
  const [socialOpen, setSocialOpen] = useState(true);
  const [jsonLdOpen, setJsonLdOpen] = useState(true);

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [hideFromSearchEngines, setHideFromSearchEngines] = useState(false);

  const [ogTitle, setOgTitle] = useState('Careers at Your Company');
  const [ogDescription, setOgDescription] = useState('Join our team and build your career with us!');
  const [ogImageUrl, setOgImageUrl] = useState('https://yourcompany.com/careers-og-image.jpg');
  const [twitterCard, setTwitterCard] = useState('summary_large_image');

  const [jsonLdEnabled, setJsonLdEnabled] = useState(true);

  return (
    <Card>
      <HeaderRow>
        <CollapsibleIcon style={{ marginTop: 2 }}>
          <SearchIcon size={20} />
        </CollapsibleIcon>
        <div>
          <Title>SEO &amp; Meta Settings</Title>
          <Subtitle>
            Optimize how your careers page appears in search results and social shares.
          </Subtitle>
        </div>
      </HeaderRow>

      <Collapsible>
        <CollapsibleHeader type="button" $open={seoOpen} onClick={() => setSeoOpen((o) => !o)} aria-expanded={seoOpen}>
          <span style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
            <SearchIcon size={18} />
            Search Engine Optimization
          </span>
          <Chevron $open={seoOpen}><ChevronUp /></Chevron>
        </CollapsibleHeader>
        {seoOpen && (
          <CollapsibleBody>
            <Field>
              <LabelRow>
                <Label htmlFor="seo-meta-title">Meta Title</Label>
                <CharCount>{metaTitle.length}/{META_TITLE_MAX} characters</CharCount>
              </LabelRow>
              <Input
                id="seo-meta-title"
                placeholder="Careers at Your Company - Join Our Team"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value.slice(0, META_TITLE_MAX))}
                maxLength={META_TITLE_MAX}
              />
            </Field>
            <Field>
              <LabelRow>
                <Label htmlFor="seo-meta-desc">Meta Description</Label>
                <CharCount>{metaDescription.length}/{META_DESC_MAX} characters</CharCount>
              </LabelRow>
              <Textarea
                id="seo-meta-desc"
                placeholder="Discover exciting career opportunities at our company. We offer competitive benefits, great culture, and room for growth. Apply now!"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value.slice(0, META_DESC_MAX))}
                maxLength={META_DESC_MAX}
                rows={3}
              />
            </Field>
            <Field>
              <Label htmlFor="seo-canonical">Canonical URL (optional)</Label>
              <Input
                id="seo-canonical"
                placeholder="https://yourcompany.com/careers"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
              />
              <HelperText>Specify the preferred URL if your careers page is accessible from multiple URLs.</HelperText>
            </Field>
            <ToggleField>
              <ToggleLabelBlock>
                <ToggleLabelText>Hide from Search Engines</ToggleLabelText>
                <ToggleDesc>Enable this to prevent search engines from indexing your careers page.</ToggleDesc>
              </ToggleLabelBlock>
              <Toggle checked={hideFromSearchEngines} onChange={setHideFromSearchEngines} aria-label="Hide from search engines" />
            </ToggleField>
          </CollapsibleBody>
        )}
      </Collapsible>

      <Collapsible>
        <CollapsibleHeader type="button" $open={socialOpen} onClick={() => setSocialOpen((o) => !o)} aria-expanded={socialOpen}>
          <span style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
            <ShareIcon size={18} />
            Social Sharing (Open Graph)
          </span>
          <Chevron $open={socialOpen}><ChevronUp /></Chevron>
        </CollapsibleHeader>
        {socialOpen && (
          <CollapsibleBody>
            <Field>
              <Label htmlFor="seo-og-title">OG Title</Label>
              <Input
                id="seo-og-title"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
              />
              <HelperText>Title shown when shared on social media (defaults to meta title)</HelperText>
            </Field>
            <Field>
              <Label htmlFor="seo-og-desc">OG Description</Label>
              <Textarea
                id="seo-og-desc"
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                rows={2}
              />
            </Field>
            <Field>
              <Label htmlFor="seo-og-image">OG Image URL</Label>
              <Input
                id="seo-og-image"
                value={ogImageUrl}
                onChange={(e) => setOgImageUrl(e.target.value)}
              />
              <HelperText>Recommended size: 1200x630 pixels for best display on social platforms</HelperText>
            </Field>
            <Field>
              <Label htmlFor="seo-twitter-card">Twitter Card Type</Label>
              <Select
                id="seo-twitter-card"
                value={twitterCard}
                onChange={(e) => setTwitterCard(e.target.value)}
              >
                {TWITTER_CARD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Field>
          </CollapsibleBody>
        )}
      </Collapsible>

      <Collapsible>
        <CollapsibleHeader type="button" $open={jsonLdOpen} onClick={() => setJsonLdOpen((o) => !o)} aria-expanded={jsonLdOpen}>
          <span style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
            <CodeIcon size={18} />
            Structured Data (JSON-LD)
            {jsonLdEnabled && <Badge>Enabled</Badge>}
          </span>
          <Chevron $open={jsonLdOpen}><ChevronUp /></Chevron>
        </CollapsibleHeader>
        {jsonLdOpen && (
          <CollapsibleBody>
            <ToggleField>
              <ToggleLabelBlock>
                <ToggleLabelText>Enable Job Posting Structured Data</ToggleLabelText>
                <ToggleDesc>Automatically generate JSON-LD markup for Google for Jobs</ToggleDesc>
              </ToggleLabelBlock>
              <Toggle checked={jsonLdEnabled} onChange={setJsonLdEnabled} aria-label="Enable job posting structured data" />
            </ToggleField>
            <BulletList>
              <li>Job title, description, and requirements</li>
              <li>Location and salary information</li>
              <li>Application deadline and posting date</li>
              <li>Company name and logo</li>
            </BulletList>
          </CollapsibleBody>
        )}
      </Collapsible>
    </Card>
  );
}
