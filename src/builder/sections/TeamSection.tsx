'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import type { TypographySettings, LayoutSettings, TeamSectionSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import { SECTION_PADDING_PX, SECTION_RADIUS_PX, CONTENT_WIDTH_PX } from '@/lib/constants/layout';
import { useBuilder } from '@/builder/context/BuilderContext';

const DEFAULT_TEAM: TeamSectionSettings = {
  sectionTitle: 'Meet Our Team',
  subtitle: 'The people behind our success.',
  layout: 'grid',
  columns: 4,
  imageStyle: 'circle',
  socialLinks: false,
  departmentFilter: false,
  bioOnHover: false,
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

const Grid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

const CarouselWrap = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  display: flex;
  gap: 24px;
  padding-bottom: 8px;
  margin: 0 -40px;
  padding-left: 40px;
  padding-right: 40px;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #e5e7eb;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #9ca3af;
    border-radius: 4px;
  }
`;

const CarouselCard = styled.div`
  flex: 0 0 min(220px, 70vw);
  scroll-snap-align: start;
`;

const DepartmentFilter = styled.div<{ fontFamily: string; sectionRadius: number }>`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  font-family: ${({ fontFamily }) => fontFamily};

  select {
    padding: 10px 16px;
    border: 1px solid #e5e7eb;
    border-radius: ${({ sectionRadius }) => sectionRadius}px;
    font-size: 14px;
    min-width: 180px;
    background: white;
  }
`;

const TeamMemberWrap = styled.div<{ showBioOnHover: boolean }>`
  text-align: center;
  position: relative;
  ${({ showBioOnHover }) => showBioOnHover && 'cursor: pointer;'}
`;

const Avatar = styled.div<{ sectionRadius: number; imageStyle: string }>`
  width: 120px;
  height: 120px;
  border-radius: ${({ sectionRadius, imageStyle }) => {
    if (imageStyle === 'circle') return '50%';
    if (imageStyle === 'rounded') return '16px';
    return '0';
  }};
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
  margin: 0 0 8px;
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;

  a {
    color: var(--text);
    font-size: 18px;
    opacity: 0.8;
    text-decoration: none;
  }
  a:hover {
    color: var(--primary);
    opacity: 1;
  }
`;

const BioOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% + 24px);
  max-width: 280px;
  padding: 12px 14px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 2;

  ${TeamMemberWrap}:hover & {
    opacity: 1;
    transform: translateX(-50%) translateY(-8px);
  }
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

const TEAM = [
  { name: 'Alex Kim', role: 'CEO', department: 'Leadership', initial: 'AK', bio: 'Leading our vision and strategy since day one.' },
  { name: 'Jordan Lee', role: 'CTO', department: 'Engineering', initial: 'JL', bio: 'Building scalable systems and world-class engineering culture.' },
  { name: 'Taylor Smith', role: 'Head of Design', department: 'Design', initial: 'TS', bio: 'Crafting experiences that users love.' },
  { name: 'Morgan Brown', role: 'VP of Engineering', department: 'Engineering', initial: 'MB', bio: 'Growing teams and delivery excellence.' },
];

const DEPARTMENTS = [...new Set(TEAM.map((m) => m.department))];

export default function TeamSection({ typography, layout }: Props) {
  const { sectionSettings } = useBuilder();
  const settings: TeamSectionSettings = sectionSettings?.team
    ? { ...DEFAULT_TEAM, ...sectionSettings.team }
    : DEFAULT_TEAM;

  const scale = FONT_SCALE_MAP[typography.fontScale];
  const radiusPx = SECTION_RADIUS_PX[layout.sectionRadius];
  const [department, setDepartment] = useState<string>('');

  const filtered = settings.departmentFilter && department
    ? TEAM.filter((m) => m.department === department)
    : TEAM;

  const renderMember = (member: (typeof TEAM)[0]) => (
    <TeamMemberWrap key={member.name} showBioOnHover={settings.bioOnHover}>
      <Avatar
        sectionRadius={radiusPx}
        imageStyle={settings.imageStyle}
      >
        {member.initial}
      </Avatar>
      <MemberName fontFamily={typography.headingFont}>{member.name}</MemberName>
      <MemberRole fontFamily={typography.bodyFont}>{member.role}</MemberRole>
      {settings.socialLinks && (
        <SocialRow>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Twitter">𝕏</a>
        </SocialRow>
      )}
      {settings.bioOnHover && member.bio && (
        <BioOverlay>{member.bio}</BioOverlay>
      )}
    </TeamMemberWrap>
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

        {settings.departmentFilter && (
          <DepartmentFilter fontFamily={typography.bodyFont} sectionRadius={radiusPx}>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              aria-label="Filter by department"
            >
              <option value="">All departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </DepartmentFilter>
        )}

        {settings.layout === 'carousel' ? (
          <CarouselWrap>
            {filtered.map((m) => (
              <CarouselCard key={m.name}>{renderMember(m)}</CarouselCard>
            ))}
          </CarouselWrap>
        ) : (
          <Grid columns={settings.columns}>
            {filtered.map(renderMember)}
          </Grid>
        )}
      </ContentWidthWrap>
    </Section>
  );
}
