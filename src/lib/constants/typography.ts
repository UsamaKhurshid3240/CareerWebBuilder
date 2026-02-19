import type { FontScale } from '@/lib/types/builder';

/**
 * Font scale presets for typography settings.
 * Maps scale names to heading sizes (h1, h2, h3).
 */
export const FONT_SCALE_MAP: Record<
  FontScale,
  {
    h1: string;
    h2: string;
    h3: string;
  }
> = {
  Small: {
    h1: '28px',
    h2: '22px',
    h3: '18px',
  },
  Medium: {
    h1: '36px',
    h2: '28px',
    h3: '22px',
  },
  Large: {
    h1: '42px',
    h2: '34px',
    h3: '26px',
  },
  Display: {
    h1: '52px',
    h2: '40px',
    h3: '30px',
  },
};

/** Nav link font size by scale (HeaderNav / SidebarNav). */
export const NAV_LINK_FONT_SIZE: Record<FontScale, string> = {
  Small: '13px',
  Medium: '14px',
  Large: '15px',
  Display: '16px',
};

export const AVAILABLE_FONTS = {
  heading: ['Inter', 'DM Sans', 'Playfair Display', 'Space Grotesk', 'Archivo Black'],
  body: ['Inter', 'Open Sans', 'Plus Jakarta Sans', 'DM Sans'],
} as const;
