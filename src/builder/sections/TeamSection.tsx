'use client';

import styled from 'styled-components';
import type { TypographySettings, LayoutSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';

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
  margin-bottom: 48px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const Avatar = styled.div<{ sectionRadius: number }>`
  width: 120px;
  height: 120px;
  border-radius: ${({ sectionRadius }) => sectionRadius === 0 ? '50%' : `${sectionRadius}px`};
  background: linear-gradient(135deg, var(--primary), var(--accent));
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: 600;
`;

const MemberName = styled.h3<{ fontFamily: string }>`
  color: var(--heading);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 18px;
  margin-bottom: 4px;
`;

const MemberRole = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
  margin: 0;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const TEAM = [
  { name: 'Alex Kim', role: 'CEO', initial: 'AK' },
  { name: 'Jordan Lee', role: 'CTO', initial: 'JL' },
  { name: 'Taylor Smith', role: 'Head of Design', initial: 'TS' },
  { name: 'Morgan Brown', role: 'VP of Engineering', initial: 'MB' },
];

export default function TeamSection({ typography, layout }: Props) {
  const scale = FONT_SCALE_MAP[typography.fontScale];

  return (
    <Section
      sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Meet Our Team
        </Title>
        <Grid>
          {TEAM.map((member, i) => (
            <TeamMember key={i}>
              <Avatar sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}>
                {member.initial}
              </Avatar>
              <MemberName fontFamily={typography.headingFont}>{member.name}</MemberName>
              <MemberRole fontFamily={typography.bodyFont}>{member.role}</MemberRole>
            </TeamMember>
          ))}
        </Grid>
      </ContentWidthWrap>
    </Section>
  );
}
