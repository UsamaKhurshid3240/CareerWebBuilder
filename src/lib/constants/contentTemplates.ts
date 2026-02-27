import type {
  BuilderPatch,
  ThemeColors,
  TypographySettings,
  ButtonSettings,
  LayoutSettings,
  NavigationSettings,
  SectionSettingsState,
} from '@/lib/types/builder';

export const CONTENT_TEMPLATE_TABS = {
  hero: 'Hero',
  about: 'About',
  benefits: 'Benefits',
} as const;

export type ContentTemplateTabId = keyof typeof CONTENT_TEMPLATE_TABS;

export interface ContentTemplateConfig {
  id: string;
  section: ContentTemplateTabId;
  name: string;
  category: string;
  description: string;
  sectionSettings: Partial<SectionSettingsState>;
  layout?: Partial<LayoutSettings>;
  typography?: Partial<TypographySettings>;
  buttons?: Partial<ButtonSettings>;
  colors?: Partial<ThemeColors>;
  navigation?: Partial<NavigationSettings>;
  multiPageLayout?: boolean;
}

export function contentTemplateToPayload(
  template: ContentTemplateConfig
): BuilderPatch {
  return {
    sectionSettings: template.sectionSettings,
    layout: template.layout,
    typography: template.typography,
    buttons: template.buttons,
    colors: template.colors,
    navigation: template.navigation,
    multiPageLayout: template.multiPageLayout,
  };
}

export const CONTENT_TEMPLATES: ContentTemplateConfig[] = [
  {
    id: 'hero-tech-startup',
    section: 'hero',
    name: 'Tech Startup',
    category: 'Technology',
    description: 'Build the future with us',
    sectionSettings: {
      hero: {
        headline: 'Build the future with us',
        subheadline: 'Join a high-impact team building products loved by millions.',
        primaryCtaText: 'See Open Roles',
        secondaryCtaText: 'Meet the Team',
        primaryCtaLink: '#jobs',
        secondaryCtaLink: '#team',
        alignment: 'left',
        showSubheadline: true,
        showPrimaryCta: true,
        showSecondaryCta: true,
        backgroundType: 'gradient',
        backgroundColor: '#111827',
        backgroundImage: '',
        overlayOpacity: 0.3,
        textColor: '#ffffff',
        sectionHeight: 'medium',
        animationOnLoad: 'slide',
        visibleDesktop: true,
        visibleTablet: true,
        visibleMobile: true,
        scrollIndicator: true,
        animateText: true,
        parallaxEffect: false,
      },
    },
    layout: {
      sectionPadding: 'normal',
      contentWidth: 'wide',
      sectionRadius: 'medium',
      cardShadow: 'medium',
      sectionAnimation: 'slide',
      hoverEffects: true,
      heroGradientType: 'linear',
      heroGradientAngle: 135,
      heroGradientStops: [
        { color: '#0f172a', pos: 0 },
        { color: '#2563eb', pos: 100 },
      ],
      heroGradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    },
    typography: { headingFont: 'Inter', bodyFont: 'Inter', fontScale: 'Large' },
    buttons: { style: 'rounded', cornerRadius: 10 },
  },
  {
    id: 'hero-healthcare',
    section: 'hero',
    name: 'Healthcare',
    category: 'Healthcare',
    description: 'Make a difference every day',
    sectionSettings: {
      hero: {
        headline: 'Make a difference every day',
        subheadline: 'Help us improve lives through compassionate, world-class care.',
        primaryCtaText: 'Apply Today',
        secondaryCtaText: 'Our Values',
        primaryCtaLink: '#jobs',
        secondaryCtaLink: '#about',
        alignment: 'center',
        showSubheadline: true,
        showPrimaryCta: true,
        showSecondaryCta: true,
        backgroundType: 'gradient',
        backgroundColor: '#0f766e',
        backgroundImage: '',
        overlayOpacity: 0.25,
        textColor: '#ffffff',
        sectionHeight: 'medium',
        animationOnLoad: 'fade',
        visibleDesktop: true,
        visibleTablet: true,
        visibleMobile: true,
        scrollIndicator: false,
        animateText: false,
        parallaxEffect: false,
      },
    },
    layout: {
      sectionPadding: 'spacious',
      contentWidth: 'medium',
      sectionRadius: 'small',
      cardShadow: 'subtle',
      sectionAnimation: 'fade',
      hoverEffects: true,
      heroGradientType: 'linear',
      heroGradientAngle: 135,
      heroGradientStops: [
        { color: '#0f766e', pos: 0 },
        { color: '#14b8a6', pos: 100 },
      ],
      heroGradient: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
    },
    typography: { headingFont: 'Open Sans', bodyFont: 'Open Sans', fontScale: 'Medium' },
    buttons: { style: 'solid', cornerRadius: 8 },
  },
  {
    id: 'hero-finance',
    section: 'hero',
    name: 'Finance',
    category: 'Finance',
    description: 'Shape tomorrow’s financial world',
    sectionSettings: {
      hero: {
        headline: 'Shape tomorrow’s financial world',
        subheadline: 'Join a team solving complex financial challenges at global scale.',
        primaryCtaText: 'Explore Opportunities',
        secondaryCtaText: 'Why Join Us',
        primaryCtaLink: '#jobs',
        secondaryCtaLink: '#benefits',
        alignment: 'left',
        showSubheadline: true,
        showPrimaryCta: true,
        showSecondaryCta: true,
        backgroundType: 'gradient',
        backgroundColor: '#1e293b',
        backgroundImage: '',
        overlayOpacity: 0.35,
        textColor: '#ffffff',
        sectionHeight: 'medium',
        animationOnLoad: 'fade',
        visibleDesktop: true,
        visibleTablet: true,
        visibleMobile: true,
        scrollIndicator: false,
        animateText: false,
        parallaxEffect: false,
      },
    },
    layout: {
      sectionPadding: 'normal',
      contentWidth: 'medium',
      sectionRadius: 'small',
      cardShadow: 'subtle',
      sectionAnimation: 'none',
      hoverEffects: false,
      heroGradientType: 'linear',
      heroGradientAngle: 180,
      heroGradientStops: [
        { color: '#0f172a', pos: 0 },
        { color: '#1e293b', pos: 100 },
      ],
      heroGradient: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
    },
    typography: { headingFont: 'Playfair Display', bodyFont: 'Open Sans', fontScale: 'Medium' },
    buttons: { style: 'solid', cornerRadius: 6 },
  },
  {
    id: 'hero-creative',
    section: 'hero',
    name: 'Creative Agency',
    category: 'Creative',
    description: 'Where creativity meets impact',
    sectionSettings: {
      hero: {
        headline: 'Where creativity meets impact',
        subheadline: 'Collaborate with designers, strategists, and makers shaping standout brands.',
        primaryCtaText: 'Join the Studio',
        secondaryCtaText: 'View Work',
        primaryCtaLink: '#jobs',
        secondaryCtaLink: '#about',
        alignment: 'center',
        showSubheadline: true,
        showPrimaryCta: true,
        showSecondaryCta: true,
        backgroundType: 'gradient',
        backgroundColor: '#7c3aed',
        backgroundImage: '',
        overlayOpacity: 0.2,
        textColor: '#ffffff',
        sectionHeight: 'medium',
        animationOnLoad: 'slide',
        visibleDesktop: true,
        visibleTablet: true,
        visibleMobile: true,
        scrollIndicator: true,
        animateText: true,
        parallaxEffect: false,
      },
    },
    layout: {
      sectionPadding: 'compact',
      contentWidth: 'full',
      sectionRadius: 'large',
      cardShadow: 'dramatic',
      sectionAnimation: 'scale',
      hoverEffects: true,
      heroGradientType: 'radial',
      heroGradientAngle: 0,
      heroGradientStops: [
        { color: '#8b5cf6', pos: 0 },
        { color: '#ec4899', pos: 100 },
      ],
      heroGradient: 'radial-gradient(circle at center, #8b5cf6 0%, #ec4899 100%)',
    },
    typography: { headingFont: 'Space Grotesk', bodyFont: 'DM Sans', fontScale: 'Display' },
    buttons: { style: 'pill', cornerRadius: 999 },
  },
  {
    id: 'about-tech',
    section: 'about',
    name: 'Innovation Story',
    category: 'Technology',
    description: 'A fast-moving, product-led company',
    sectionSettings: {
      about: {
        sectionTitle: 'Built by curious people',
        content:
          'We are a product-led team that values ownership, speed, and craftsmanship. Every role helps shape what we build next.',
        layout: 'split',
        imageUrl: '',
        showCompanyValues: true,
        companyValues: ['Ownership', 'Learning', 'Impact'],
      },
    },
  },
  {
    id: 'about-healthcare',
    section: 'about',
    name: 'Purpose & Care',
    category: 'Healthcare',
    description: 'Mission-first, patient-centered culture',
    sectionSettings: {
      about: {
        sectionTitle: 'Care with purpose',
        content:
          'Our mission is to improve patient outcomes through teamwork, empathy, and clinical excellence.',
        layout: 'centered',
        imageUrl: '',
        showCompanyValues: true,
        companyValues: ['Compassion', 'Integrity', 'Excellence'],
      },
    },
  },
  {
    id: 'about-finance',
    section: 'about',
    name: 'Trusted Expertise',
    category: 'Finance',
    description: 'Precision, trust, and long-term thinking',
    sectionSettings: {
      about: {
        sectionTitle: 'Trusted by global clients',
        content:
          'We combine rigorous analysis with modern technology to deliver resilient financial solutions.',
        layout: 'left',
        imageUrl: '',
        showCompanyValues: true,
        companyValues: ['Trust', 'Precision', 'Accountability'],
      },
    },
  },
  {
    id: 'about-creative',
    section: 'about',
    name: 'Creative Culture',
    category: 'Creative',
    description: 'Bold ideas from diverse minds',
    sectionSettings: {
      about: {
        sectionTitle: 'Creativity is our operating system',
        content:
          'We bring together strategy, design, and storytelling to create experiences people remember.',
        layout: 'split',
        imageUrl: '',
        showCompanyValues: true,
        companyValues: ['Curiosity', 'Collaboration', 'Craft'],
      },
    },
  },
  {
    id: 'benefits-tech',
    section: 'benefits',
    name: 'Tech Perks',
    category: 'Technology',
    description: 'High-growth benefits for builders',
    sectionSettings: {
      benefits: {
        sectionTitle: 'Benefits built for builders',
        subtitle: 'We invest in your growth, wellbeing, and work-life balance.',
        layout: 'cards',
        columns: 3,
        items: [
          { id: 't-b1', title: 'Remote-first', description: 'Work where you work best.', icon: '🌍' },
          { id: 't-b2', title: 'Learning Budget', description: '$2k/year for growth.', icon: '📚' },
          { id: 't-b3', title: 'Top-tier Equipment', description: 'Best tools for best work.', icon: '💻' },
        ],
      },
    },
    layout: { cardShadow: 'medium', hoverEffects: true },
  },
  {
    id: 'benefits-healthcare',
    section: 'benefits',
    name: 'Care Team Benefits',
    category: 'Healthcare',
    description: 'Support for people who support others',
    sectionSettings: {
      benefits: {
        sectionTitle: 'We care for our caregivers',
        subtitle: 'Comprehensive support for your life and career.',
        layout: 'grid',
        columns: 4,
        items: [
          { id: 'h-b1', title: 'Health Coverage', description: 'Medical, dental, vision.', icon: '🏥' },
          { id: 'h-b2', title: 'Wellness Days', description: 'Dedicated time to recharge.', icon: '🧘' },
          { id: 'h-b3', title: 'Continuing Education', description: 'Training and certifications.', icon: '🎓' },
          { id: 'h-b4', title: 'Retirement Plan', description: 'Plan confidently for the future.', icon: '📈' },
        ],
      },
    },
  },
  {
    id: 'benefits-finance',
    section: 'benefits',
    name: 'Enterprise Benefits',
    category: 'Finance',
    description: 'Stable, competitive, and comprehensive',
    sectionSettings: {
      benefits: {
        sectionTitle: 'Comprehensive employee package',
        subtitle: 'Competitive rewards for long-term growth.',
        layout: 'list',
        columns: 2,
        items: [
          { id: 'f-b1', title: 'Performance Bonus', description: 'Rewarding high impact.', icon: '💰' },
          { id: 'f-b2', title: '401(k) Match', description: 'Secure your future.', icon: '🏦' },
          { id: 'f-b3', title: 'Flexible Time Off', description: 'Take the time you need.', icon: '🏖️' },
          { id: 'f-b4', title: 'Family Support', description: 'Programs for every life stage.', icon: '👨‍👩‍👧‍👦' },
        ],
      },
    },
  },
  {
    id: 'benefits-creative',
    section: 'benefits',
    name: 'Creative Studio Perks',
    category: 'Creative',
    description: 'Freedom, collaboration, and craft',
    sectionSettings: {
      benefits: {
        sectionTitle: 'Perks for creative minds',
        subtitle: 'A flexible environment designed for great ideas.',
        layout: 'cards',
        columns: 3,
        items: [
          { id: 'c-b1', title: 'Flexible Schedule', description: 'Find your most creative hours.', icon: '⏰' },
          { id: 'c-b2', title: 'Creative Budget', description: 'Tools, workshops, inspiration.', icon: '🎨' },
          { id: 'c-b3', title: 'Studio Days', description: 'Collaborate in person when needed.', icon: '🏢' },
        ],
      },
    },
  },
];

