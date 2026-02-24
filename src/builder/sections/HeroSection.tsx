'use client';

import { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import type { TypographySettings, ButtonSettings, LayoutSettings, HeroSectionSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';
import { useBuilder } from '@/builder/context/BuilderContext';

const DEFAULT_HERO: Pick<
  HeroSectionSettings,
  | 'headline'
  | 'subheadline'
  | 'alignment'
  | 'showSubheadline'
  | 'showPrimaryCta'
  | 'showSecondaryCta'
  | 'primaryCtaText'
  | 'primaryCtaLink'
  | 'secondaryCtaText'
  | 'secondaryCtaLink'
  | 'backgroundType'
  | 'backgroundColor'
  | 'backgroundImage'
  | 'overlayOpacity'
  | 'textColor'
  | 'sectionHeight'
  | 'animationOnLoad'
  | 'visibleDesktop'
  | 'visibleTablet'
  | 'visibleMobile'
  | 'scrollIndicator'
  | 'animateText'
  | 'parallaxEffect'
> = {
  headline: 'Join Our Team',
  subheadline: 'Discover amazing career opportunities.',
  alignment: 'center',
  showSubheadline: true,
  showPrimaryCta: true,
  showSecondaryCta: true,
  primaryCtaText: 'View Open Positions',
  primaryCtaLink: '#jobs',
  secondaryCtaText: 'Learn More',
  secondaryCtaLink: '#about',
  backgroundType: 'gradient',
  backgroundColor: '#111827',
  backgroundImage: '',
  overlayOpacity: 0.4,
  textColor: '#ffffff',
  sectionHeight: 'medium',
  animationOnLoad: 'fade',
  visibleDesktop: true,
  visibleTablet: true,
  visibleMobile: true,
  scrollIndicator: false,
  animateText: false,
  parallaxEffect: false,
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Hero = styled.section<{
  backgroundCss: string;
  sectionPadding: number;
  sectionRadius: number;
  textAlign: string;
  textColor: string;
  sectionHeight: string;
  animationOnLoad: string;
  visibleDesktop: boolean;
  visibleTablet: boolean;
  visibleMobile: boolean;
}>`
  color: ${({ textColor }) => textColor};
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  text-align: ${({ textAlign }) => textAlign};
  border-top-left-radius: ${({ sectionRadius }) => sectionRadius}px;
  border-top-right-radius: ${({ sectionRadius }) => sectionRadius}px;
  position: relative;
  min-height: ${({ sectionHeight }) =>
    sectionHeight === 'small' ? '280px' : sectionHeight === 'medium' ? '420px' : sectionHeight === 'full' ? '100vh' : 'auto'};
  ${({ animationOnLoad }) =>
    animationOnLoad === 'fade' && css`animation: ${fadeIn} 0.6s ease-out both;`}
  ${({ animationOnLoad }) =>
    animationOnLoad === 'slide' && css`animation: ${slideUp} 0.6s ease-out both;`}

  @media (min-width: 1024px) {
    display: ${({ visibleDesktop }) => (visibleDesktop ? 'block' : 'none')};
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    display: ${({ visibleTablet }) => (visibleTablet ? 'block' : 'none')};
  }
  @media (max-width: 767px) {
    display: ${({ visibleMobile }) => (visibleMobile ? 'block' : 'none')};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ backgroundCss }) => backgroundCss};
    border-radius: inherit;
    z-index: -1;
  }
`;

const ContentWidthWrap = styled.div<{ contentWidth: string; textAlign: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign};
`;

const Title = styled.h1<{ fontSize: string; fontFamily: string }>`
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  margin-bottom: 16px;
`;

const Subtitle = styled.p<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  margin-bottom: 24px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;

  &[data-align='left'] {
    justify-content: flex-start;
  }
  &[data-align='right'] {
    justify-content: flex-end;
  }
`;

const Button = styled.a<{
  buttonStyle: ButtonSettings['style'];
  cornerRadius: number;
  $hoverEffects?: boolean;
}>`
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: ${({ buttonStyle, cornerRadius }) =>
    buttonStyle === 'pill' ? '999px' : `${cornerRadius}px`};
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  ${({ $hoverEffects }) =>
    $hoverEffects &&
    `
    transition: transform 0.2s ease, opacity 0.2s ease;
    &:hover {
      transform: translateY(-1px);
      opacity: 0.95;
    }
  `}
`;

const ButtonSecondary = styled.a<{
  buttonStyle: ButtonSettings['style'];
  cornerRadius: number;
  $hoverEffects?: boolean;
}>`
  background: transparent;
  color: white;
  border: 2px solid currentColor;
  padding: 10px 22px;
  border-radius: ${({ buttonStyle, cornerRadius }) =>
    buttonStyle === 'pill' ? '999px' : `${cornerRadius}px`};
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  ${({ $hoverEffects }) =>
    $hoverEffects &&
    `
    transition: transform 0.2s ease, opacity 0.2s ease;
    &:hover {
      transform: translateY(-1px);
      opacity: 0.9;
    }
  `}
`;

const ScrollIndicator = styled.div`
  margin-top: 32px;
  width: 24px;
  height: 40px;
  border: 2px solid currentColor;
  border-radius: 12px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.8;

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: currentColor;
    border-radius: 2px;
    animation: scrollBounce 2s ease-in-out infinite;
  }

  @keyframes scrollBounce {
    0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
    50% { opacity: 0.5; transform: translateX(-50%) translateY(6px); }
  }
`;

interface Props {
  logo?: string | null;
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
}

function getHeroBackgroundCss(
  hero: typeof DEFAULT_HERO,
  layoutGradient: string
): string {
  if (hero.backgroundType === 'solid') {
    return hero.backgroundColor;
  }
  if (hero.backgroundType === 'image' && hero.backgroundImage) {
    const overlay = `linear-gradient(rgba(0,0,0,${hero.overlayOpacity}), rgba(0,0,0,${hero.overlayOpacity}))`;
    return `${overlay}, url(${hero.backgroundImage}) center/cover`;
  }
  return layoutGradient;
}


function HeroSection({ logo, typography, buttons, layout }: Props) {
  const { sectionSettings } = useBuilder();
  const hero = sectionSettings?.hero
    ? { ...DEFAULT_HERO, ...sectionSettings.hero }
    : DEFAULT_HERO;
  const scale = FONT_SCALE_MAP[typography.fontScale];
  const alignment = hero.alignment || 'center';
  const backgroundCss = getHeroBackgroundCss(hero, layout.heroGradient);

  return (
    <Hero
      backgroundCss={backgroundCss}
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
      textAlign={alignment}
      textColor={hero.textColor ?? '#ffffff'}
      sectionHeight={hero.sectionHeight ?? 'medium'}
      animationOnLoad={hero.animationOnLoad ?? 'fade'}
      visibleDesktop={hero.visibleDesktop ?? true}
      visibleTablet={hero.visibleTablet ?? true}
      visibleMobile={hero.visibleMobile ?? true}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]} textAlign={alignment}>
        {logo && (
          <img
            src={logo}
            alt="Company Logo"
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: 20,
            }}
          />
        )}

        <Title fontSize={scale.h1} fontFamily={typography.headingFont}>
          {hero.headline}
        </Title>
        {hero.showSubheadline && (
          <Subtitle fontFamily={typography.bodyFont}>
            {hero.subheadline}
          </Subtitle>
        )}
        <ButtonWrap data-align={alignment}>
          {hero.showPrimaryCta && hero.primaryCtaText && (
            <Button
              buttonStyle={buttons.style}
              cornerRadius={buttons.cornerRadius}
              $hoverEffects={layout.hoverEffects}
              href={hero.primaryCtaLink || '#'}
            >
              {hero.primaryCtaText}
            </Button>
          )}
          {hero.showSecondaryCta && hero.secondaryCtaText && (
            <ButtonSecondary
              buttonStyle={buttons.style}
              cornerRadius={buttons.cornerRadius}
              $hoverEffects={layout.hoverEffects}
              href={hero.secondaryCtaLink || '#'}
            >
              {hero.secondaryCtaText}
            </ButtonSecondary>
          )}
        </ButtonWrap>
        {hero.scrollIndicator && <ScrollIndicator />}
      </ContentWidthWrap>
    </Hero>
  );
}

export default memo(HeroSection);
