'use client';

import { memo } from 'react';
import styled from 'styled-components';
import type { TypographySettings, LayoutSettings } from '@/lib/types/builder';
import type { BenefitsSectionSettings } from '@/lib/types/builder';
import { useBuilder } from '@/builder/context/BuilderContext';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

const DEFAULT_BENEFITS: BenefitsSectionSettings = {
  sectionTitle: 'Why Work With Us',
  subtitle: 'We offer competitive benefits to help you thrive at work and at home.',
  layout: 'grid',
  columns: 4,
  items: [
    { id: 'b1', title: 'Competitive Salary', description: 'We offer market-leading compensation packages.', icon: '💰' },
    { id: 'b2', title: 'Health Insurance', description: 'Comprehensive health, dental, and vision coverage.', icon: '🏥' },
    { id: 'b3', title: 'Flexible PTO', description: 'Take time off when you need it.', icon: '🏖️' },
    { id: 'b4', title: 'Learning Budget', description: 'Annual budget for courses and conferences.', icon: '📚' },
    { id: 'b5', title: 'Remote Work', description: 'Work from anywhere.', icon: '🏠' },
    { id: 'b6', title: 'Parental Leave', description: 'Generous paid leave for new parents.', icon: '👶' },
  ],
};

const Section = styled.section<{
  sectionPadding: number;
  sectionRadius: number;
}>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
`;

const ContentWidthWrap = styled.div<{ contentWidth: string }>`
  max-width: ${({ contentWidth }) => contentWidth};
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h2<{ fontSize: string; fontFamily: string }>`
  color: var(--heading);
  font-size: ${({ fontSize }) => fontSize};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: center;
  margin: 0 0 12px;
`;

const Subtitle = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  text-align: center;
  margin: 0 0 48px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
`;

const Grid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 16px 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ sectionRadius: number; $hoverEffects?: boolean }>`
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  ${({ $hoverEffects }) =>
    $hoverEffects &&
    `
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const ListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const Icon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const IconSmall = styled(Icon)`
  width: 40px;
  height: 40px;
  font-size: 20px;
`;

const CardTitle = styled.h3<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 20px;
  margin: 0 0 8px;
`;

const ListItemTitle = styled.div<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const CardText = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

const ListItemDesc = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 4px 0 0;
  line-height: 1.5;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

function BenefitsSection({ typography, layout }: Props) {
  const { sectionSettings } = useBuilder();
  const benefits = sectionSettings?.benefits
    ? {
        ...DEFAULT_BENEFITS,
        ...sectionSettings.benefits,
        items: sectionSettings.benefits.items?.length
          ? sectionSettings.benefits.items
          : DEFAULT_BENEFITS.items,
      }
    : DEFAULT_BENEFITS;

  const scale = FONT_SCALE_MAP[typography.fontScale];
  const padding = SECTION_PADDING_PX[layout.sectionPadding];
  const radius = SECTION_RADIUS_PX[layout.sectionRadius];
  const contentWidth = CONTENT_WIDTH_PX[layout.contentWidth];
  const { sectionTitle, subtitle, layout: layoutType, columns, items } = benefits;

  return (
    <Section sectionPadding={padding} sectionRadius={radius}>
      <ContentWidthWrap contentWidth={contentWidth}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          {sectionTitle}
        </Title>
        {subtitle && (
          <Subtitle fontFamily={typography.bodyFont}>{subtitle}</Subtitle>
        )}
        {layoutType === 'list' && (
          <List columns={columns}>
            {items.map((item) => (
              <ListItem key={item.id}>
                <IconSmall>{item.icon || '•'}</IconSmall>
                <div>
                  <ListItemTitle fontFamily={typography.headingFont}>
                    {item.title}
                  </ListItemTitle>
                  {item.description && (
                    <ListItemDesc fontFamily={typography.bodyFont}>
                      {item.description}
                    </ListItemDesc>
                  )}
                </div>
              </ListItem>
            ))}
          </List>
        )}
        {(layoutType === 'grid' || layoutType === 'cards') && (
          <Grid columns={columns}>
            {items.map((item) => (
              <Card key={item.id} sectionRadius={radius} $hoverEffects={layout.hoverEffects}>
                <Icon>{item.icon || '✨'}</Icon>
                <CardTitle fontFamily={typography.headingFont}>
                  {item.title}
                </CardTitle>
                <CardText fontFamily={typography.bodyFont}>
                  {item.description || ''}
                </CardText>
              </Card>
            ))}
          </Grid>
        )}
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(BenefitsSection);
