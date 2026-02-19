import type { SectionId } from '@/lib/types/builder';

/**
 * Single source of truth for all available section components.
 * Must match: src/builder/sections/*.tsx and SectionMapper.
 * When adding a new section: add here, add to SectionId in types, and add case in SectionMapper.
 */
export const ALL_SECTIONS: {
  id: SectionId;
  label: string;
  description: string;
  icon: string;
  required?: boolean;
}[] = [
  { id: 'hero', label: 'Hero Banner', description: 'Main headline and CTA', icon: '🏠' },
  { id: 'about', label: 'About Us', description: 'Company overview and mission', icon: '📖' },
  { id: 'benefits', label: 'Benefits', description: 'Perks and benefits list', icon: '💰' },
  { id: 'locations', label: 'Locations', description: 'Office and remote locations', icon: '📍' },
  { id: 'hiring', label: 'Hiring Process', description: 'Steps in your hiring flow', icon: '📋' },
  { id: 'faq', label: 'FAQ', description: 'Frequently asked questions', icon: '❓' },
  { id: 'dei', label: 'D&I', description: 'Diversity and inclusion stats', icon: '🌈' },
  { id: 'videos', label: 'Videos', description: 'Video content blocks', icon: '🎬' },
  { id: 'testimonials', label: 'Testimonials', description: 'Team quotes and reviews', icon: '💬' },
  { id: 'team', label: 'Team', description: 'Team member profiles', icon: '👥' },
  { id: 'jobs', label: 'Open Positions', description: 'Job listings (required)', icon: '💼', required: true },
  { id: 'alerts', label: 'Alerts', description: 'Banner alerts and notices', icon: '🔔' },
  { id: 'apply', label: 'Apply Form', description: 'Application form', icon: '📝' },
  { id: 'analytics', label: 'Analytics', description: 'Company metrics and stats', icon: '📊' },
  { id: 'footer', label: 'Footer', description: 'Site footer and links', icon: '🔗' },
];
