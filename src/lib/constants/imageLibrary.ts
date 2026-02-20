/**
 * Curated stock images for the Image Library modal.
 * Photos from Unsplash (https://unsplash.com). Hotlinking allowed per Unsplash guidelines.
 */

export type ImageLibraryCategory = 'all' | 'team' | 'office' | 'tech' | 'remote';

export interface ImageLibraryItem {
  id: string;
  url: string;
  caption: string;
  category: Exclude<ImageLibraryCategory, 'all'>;
}

function u(id: string, caption: string, category: ImageLibraryItem['category']): ImageLibraryItem {
  return {
    id,
    url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`,
    caption,
    category,
  };
}

export const IMAGE_LIBRARY: ImageLibraryItem[] = [
  u('1522071820081-009f0129c71c', 'Team collaboration', 'team'),
  u('1497366216548-37526070297c', 'Modern office space', 'office'),
  u('1517245386807-bb43f82c33c4', 'Team meeting', 'team'),
  u('1504384308090-c6fd6f8a4f2b', 'Office workspace', 'office'),
  u('1499951360447-b19be8fe80f5', 'Tech workspace', 'tech'),
  u('1522071820081-009f0129c71c', 'Team brainstorming', 'team'),
  u('1497366811353-6870744d2b16', 'Office interior', 'office'),
  u('1504384764581-bad30473a07a', 'Remote work', 'remote'),
  u('1522202176988-66273c2fd55f', 'Team discussion', 'team'),
  u('1556761175-b413da4baf72', 'Collaboration', 'team'),
  u('1557804506-669a67965ba0', 'Office desk', 'office'),
  u('1551434678-e076c223a692', 'Tech team', 'tech'),
  u('1519389950473-47ba0277781c', 'Remote collaboration', 'remote'),
  u('1600880292203-757bb62b4baf', 'Team success', 'team'),
  u('1552664730-d307ca844978', 'Meeting room', 'office'),
  u('1573496359142-b8d87734a5a2', 'Professional', 'tech'),
  u('1542744173-8e7e53415bb6', 'Remote meeting', 'remote'),
  u('1600880292089-90a7e086ee0a', 'Teamwork', 'team'),
  u('1497215842964-222b430dc094', 'Workspace', 'office'),
  u('1531482615713-2afd69037398', 'Tech workspace', 'tech'),
  u('1523240795612-9a054b0db644', 'Home office', 'remote'),
];

export const IMAGE_LIBRARY_CATEGORIES: { value: ImageLibraryCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'team', label: 'Team' },
  { value: 'office', label: 'Office' },
  { value: 'tech', label: 'Tech' },
  { value: 'remote', label: 'Remote' },
];
