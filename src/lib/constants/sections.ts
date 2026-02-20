import type { SectionId } from '@/lib/types/builder';

/** Single source of truth for section metadata (icon, label, description). Use getSectionMeta() to avoid duplication. */
export interface SectionMeta {
  id: SectionId;
  label: string;
  description: string;
  icon: string;
  required?: boolean;
}

const SECTION_META: SectionMeta[] = [
  { id: 'hero', label: 'Hero Section', description: 'Main headline and CTA', icon: '🎯' },
  { id: 'about', label: 'About Us', description: 'Company overview and mission', icon: 'ℹ️' },
  { id: 'benefits', label: 'Benefits', description: 'Perks and benefits list', icon: '🎁' },
  { id: 'jobs', label: 'Open Positions', description: 'Job listings (required)', icon: '💼', required: true },
  { id: 'team', label: 'Team Gallery', description: 'Team member profiles', icon: '👥' },
  { id: 'alerts', label: 'Job Alerts', description: 'Subscribe for new openings', icon: '📧' },
  { id: 'testimonials', label: 'Testimonials', description: 'Team quotes and reviews', icon: '💬' },
  { id: 'locations', label: 'Locations', description: 'Office and remote locations', icon: '📍' },
  { id: 'hiring', label: 'Hiring Process', description: 'Steps in your hiring flow', icon: '📋' },
  { id: 'faq', label: 'FAQ', description: 'Frequently asked questions', icon: '❓' },
  { id: 'dei', label: 'D&I', description: 'Diversity and inclusion stats', icon: '🌈' },
  { id: 'videos', label: 'Videos', description: 'Video content blocks', icon: '🎬' },
  { id: 'apply', label: 'Apply Form', description: 'Application form', icon: '📝' },
  { id: 'analytics', label: 'Analytics', description: 'Company metrics and stats', icon: '📊' },
  { id: 'footer', label: 'Footer', description: 'Site footer and links', icon: '🔗' },
];

/** Reusable helper: get section icon, label, description by id. Avoids duplicating icon/label across the app. */
export function getSectionMeta(id: SectionId): SectionMeta | undefined {
  return SECTION_META.find((s) => s.id === id);
}

/** Get section icon (emoji). Returns a default if id not found. */
export function getSectionIcon(id: SectionId): string {
  return getSectionMeta(id)?.icon ?? '📄';
}

/** Get section label. Returns id if not found. */
export function getSectionLabel(id: SectionId): string {
  return getSectionMeta(id)?.label ?? id;
}

/**
 * All sections in display order. Single source of truth for Layout tab and anywhere section list is needed.
 * Must match: src/builder/sections/*.tsx and SectionMapper.
 */
export const ALL_SECTIONS: SectionMeta[] = SECTION_META;
