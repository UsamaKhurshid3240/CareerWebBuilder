'use client';

import React, { memo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { TypographySettings, LayoutSettings, TestimonialsSectionSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CARD_SHADOW_CSS, CONTENT_WIDTH_PX } from '@/lib/constants/layout';
import { useBuilder } from '@/builder/context/BuilderContext';
import { BUILDER_UI, SHADES } from '@/lib/constants/colors';
import { SHADOW } from '@/lib/constants/glassUI';

const DEFAULT_TESTIMONIALS: TestimonialsSectionSettings = {
  sectionTitle: 'What Our Team Says',
  subtitle: 'Hear from the people who work here.',
  layout: 'carousel',
  cardStyle: 'card',
  showRatings: true,
  autoplay: false,
  showArrows: false,
};

const Section = styled.section<{
  sectionPadding: number;
  sectionRadius: number;
}>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  background: ${SHADES.bg};
  width: 100%;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
  min-width: 0;
`;

const Title = styled.h2<{ fontSize: string; fontFamily: string }>`
  color: var(--heading);
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  text-align: center;
  margin-bottom: 48px;
  line-height: 1.5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 24px;
  min-width: 0;
`;

const CarouselWrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  margin-left: 0;
  margin-right: 0;
`;

const CarouselScroll = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 8px;
  min-width: 0;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${SHADES.border};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${BUILDER_UI.muted};
    border-radius: 4px;
  }
`;

const CarouselCard = styled.div`
  flex: 0 0 min(320px, 100%);
  min-width: 0;
  scroll-snap-align: start;
`;

const ArrowBtn = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? 'left: 8px' : 'right: 8px')};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${SHADES.border};
  background: ${SHADES.white};
  box-shadow: ${SHADOW.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--heading);
  z-index: 1;

  &:hover {
    background: ${SHADES.bg};
    border-color: ${BUILDER_UI.inputBorder};
  }
`;

const TestimonialCard = styled.div<{
  sectionRadius: number;
  cardShadow: string;
  cardStyle: string;
  $hoverEffects?: boolean;
}>`
  padding: ${({ cardStyle }) =>
    cardStyle === 'minimal' ? '20px 24px' : cardStyle === 'quote' ? '24px 24px 24px 32px' : '32px'};
  background: ${SHADES.white};
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  box-shadow: ${({ cardShadow }) => cardShadow};
  height: 100%;
  min-height: 200px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-left: ${({ cardStyle }) => (cardStyle === 'quote' ? '4px solid var(--primary)' : 'none')};
  box-sizing: border-box;
  ${({ $hoverEffects }) =>
    $hoverEffects &&
    `
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${SHADOW.md};
    }
  `}
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 12px;
  color: ${BUILDER_UI.warning};
  font-size: 14px;
`;

const Quote = styled.p<{ fontFamily: string; cardStyle: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ cardStyle }) => (cardStyle === 'minimal' ? '14px' : '16px')};
  font-style: ${({ cardStyle }) => (cardStyle === 'quote' ? 'italic' : 'normal')};
  margin-bottom: 24px;
  line-height: 1.6;
  flex: 1;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: 600;
  font-size: 14px;
`;

const AuthorRole = styled.div<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 12px;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const TESTIMONIALS = [
  { quote: 'This is the best place I\'ve ever worked. The culture, the people, everything is amazing.', name: 'Sarah Chen', role: 'Senior Engineer', initial: 'S', rating: 5 },
  { quote: 'I\'ve grown so much here. The opportunities for learning and advancement are incredible.', name: 'Michael Rodriguez', role: 'Product Manager', initial: 'M', rating: 5 },
  { quote: 'The work-life balance is perfect, and I feel valued every single day.', name: 'Emily Johnson', role: 'Design Lead', initial: 'E', rating: 5 },
];

function StarRating({ n }: { n: number }) {
  return (
    <Stars aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (i <= n ? '★' : '☆'))}
    </Stars>
  );
}

function TestimonialsSection({ typography, layout }: Props) {
  const { sectionSettings } = useBuilder();
  const settings: TestimonialsSectionSettings = sectionSettings?.testimonials
    ? { ...DEFAULT_TESTIMONIALS, ...sectionSettings.testimonials }
    : DEFAULT_TESTIMONIALS;

  const scale = FONT_SCALE_MAP[typography.fontScale];
  const radiusPx = SECTION_RADIUS_PX[layout.sectionRadius];
  const cardShadow = CARD_SHADOW_CSS[layout.cardShadow];
  const isCarousel = settings.layout === 'carousel';
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (!isCarousel || !settings.autoplay) return;
    const el = carouselRef.current;
    if (!el) return;
    const count = TESTIMONIALS.length;
    const interval = setInterval(() => {
      setCarouselIndex((i) => {
        const next = (i + 1) % count;
        const card = el.querySelector(`[data-index="${next}"]`);
        card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isCarousel, settings.autoplay]);

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    const card = el?.querySelector(`[data-index="${index}"]`);
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setCarouselIndex(index);
  };

  const renderCard = (testimonial: (typeof TESTIMONIALS)[0], index: number) => (
    <TestimonialCard
      key={index}
      sectionRadius={radiusPx}
      cardShadow={cardShadow}
      cardStyle={settings.cardStyle}
      $hoverEffects={layout.hoverEffects}
      data-index={index}
    >
      {settings.showRatings && <StarRating n={testimonial.rating} />}
      <Quote fontFamily={typography.bodyFont} cardStyle={settings.cardStyle}>
        "{testimonial.quote}"
      </Quote>
      <Author>
        <Avatar>{testimonial.initial}</Avatar>
        <AuthorInfo>
          <AuthorName fontFamily={typography.headingFont}>{testimonial.name}</AuthorName>
          <AuthorRole fontFamily={typography.bodyFont}>{testimonial.role}</AuthorRole>
        </AuthorInfo>
      </Author>
    </TestimonialCard>
  );

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={radiusPx}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          {settings.sectionTitle}
        </Title>
        <Subtitle fontFamily={typography.bodyFont}>
          {settings.subtitle}
        </Subtitle>

        {isCarousel ? (
          <CarouselWrap>
            {settings.showArrows && (
              <>
                <ArrowBtn
                  left
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => scrollToIndex((carouselIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                >
                  ‹
                </ArrowBtn>
                <ArrowBtn
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => scrollToIndex((carouselIndex + 1) % TESTIMONIALS.length)}
                >
                  ›
                </ArrowBtn>
              </>
            )}
            <CarouselScroll
              ref={carouselRef}
              onScroll={() => {
                const el = carouselRef.current;
                if (!el) return;
                const cards = el.querySelectorAll('[data-index]');
                const scrollLeft = el.scrollLeft;
                for (let i = 0; i < cards.length; i++) {
                  const card = cards[i] as HTMLElement;
                  if (card.offsetLeft - 40 >= scrollLeft - 20) {
                    setCarouselIndex(i);
                    break;
                  }
                }
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <CarouselCard key={i}>{renderCard(t, i)}</CarouselCard>
              ))}
            </CarouselScroll>
          </CarouselWrap>
        ) : (
          <Grid>
            {TESTIMONIALS.map((t, i) => renderCard(t, i))}
          </Grid>
        )}
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(TestimonialsSection);
