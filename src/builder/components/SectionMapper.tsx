'use client';

import React, { memo } from 'react';
import type {
  SectionId,
  TypographySettings,
  ButtonSettings,
  LayoutSettings,
} from '@/lib/types/builder';
import HeroSection from '@/builder/sections/HeroSection';
import AboutSection from '@/builder/sections/AboutSection';
import BenefitsSection from '@/builder/sections/BenefitsSection';
import LocationsSection from '@/builder/sections/LocationsSection';
import HiringSection from '@/builder/sections/HiringSection';
import FAQSection from '@/builder/sections/FAQSection';
import DEISection from '@/builder/sections/DEISection';
import VideosSection from '@/builder/sections/VideosSection';
import TestimonialsSection from '@/builder/sections/TestimonialsSection';
import TeamSection from '@/builder/sections/TeamSection';
import JobsSection from '@/builder/sections/JobsSection';
import AlertsSection from '@/builder/sections/AlertsSection';
import ApplyFormSection from '@/builder/sections/ApplyFormSection';
import AnalyticsSection from '@/builder/sections/AnalyticsSection';
import FooterSection from '@/builder/sections/FooterSection';

interface Props {
  sectionId: SectionId;
  logo: string | null;
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
}

function SectionMapper({ sectionId, logo, typography, buttons, layout }: Props) {
  if (!sectionId) return null;

  switch (sectionId) {
    case 'hero':
      return (
        <HeroSection
          logo={logo}
          typography={typography}
          buttons={buttons}
          layout={layout}
        />
      );
    case 'about':
      return <AboutSection typography={typography} layout={layout} />;
    case 'benefits':
      return <BenefitsSection typography={typography} layout={layout} />;
    case 'locations':
      return <LocationsSection typography={typography} layout={layout} />;
    case 'hiring':
      return <HiringSection typography={typography} layout={layout} />;
    case 'faq':
      return <FAQSection typography={typography} layout={layout} />;
    case 'dei':
      return <DEISection typography={typography} layout={layout} />;
    case 'videos':
      return <VideosSection typography={typography} layout={layout} />;
    case 'testimonials':
      return (
        <TestimonialsSection typography={typography} layout={layout} />
      );
    case 'team':
      return <TeamSection typography={typography} layout={layout} />;
    case 'jobs':
      return (
        <JobsSection typography={typography} buttons={buttons} layout={layout} />
      );
    case 'alerts':
      return <AlertsSection typography={typography} layout={layout} />;
    case 'apply':
      return (
        <ApplyFormSection
          typography={typography}
          buttons={buttons}
          layout={layout}
        />
      );
    case 'analytics':
      return <AnalyticsSection typography={typography} layout={layout} />;
    case 'footer':
      return <FooterSection typography={typography} layout={layout} />;
    default:
      return null;
  }
}

export default memo(SectionMapper);
