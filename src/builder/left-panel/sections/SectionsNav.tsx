'use client';

import styled from 'styled-components';

const Nav = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ active }) => (active ? '#111827' : '#e5e7eb')};
  background: ${({ active }) => (active ? '#111827' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#374151')};
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
`;

export type SectionKey =
  | 'hero'
  | 'about'
  | 'benefits'
  | 'locations'
  | 'hiring'
  | 'faq'
  | 'dei'
  | 'videos'
  | 'testimonials'
  | 'team'
  | 'jobs'
  | 'alerts'
  | 'apply'
  | 'seo'
  | 'analytics'
  | 'footer'
  | 'css';

const SECTIONS: { id: SectionKey; label: string }[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'locations', label: 'Locations' },
  { id: 'hiring', label: 'Hiring' },
  { id: 'faq', label: 'FAQ' },
  { id: 'dei', label: 'D&I' },
  { id: 'videos', label: 'Videos' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'team', label: 'Team' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'apply', label: 'Apply Form' },
  { id: 'seo', label: 'SEO' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'footer', label: 'Footer' },
  { id: 'css', label: 'CSS' }
];

interface Props {
  active: SectionKey;
  onChange: (section: SectionKey) => void;
}

export default function SectionsNav({ active, onChange }: Props) {
  return (
    <Nav>
      {SECTIONS.map(s => (
        <Tab
          key={s.id}
          active={active === s.id}
          onClick={() => onChange(s.id)}
        >
          {s.label}
        </Tab>
      ))}
    </Nav>
  );
}
