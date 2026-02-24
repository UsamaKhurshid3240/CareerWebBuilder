'use client';

import { memo } from 'react';
import styled from 'styled-components';
import type { TypographySettings, ButtonSettings, LayoutSettings, JobsSectionSettings } from '@/lib/types/builder';
import { FONT_SCALE_MAP } from '@/lib/constants/typography';
import {
  SECTION_PADDING_PX,
  SECTION_RADIUS_PX,
  CARD_SHADOW_CSS,
  CONTENT_WIDTH_PX,
} from '@/lib/constants/layout';
import { useBuilder } from '@/builder/context/BuilderContext';

const DEFAULT_JOBS: JobsSectionSettings = {
  layout: 'cards',
  cardStyle: 'detailed',
  showLocation: true,
  showDepartment: true,
  showSalary: false,
  showJobType: true,
  searchBar: true,
  filters: true,
};

/** Mock jobs for preview; in production would come from API/cms */
const MOCK_JOBS = [
  { id: '1', title: 'Junior Developer', location: 'Manchester, M1 2WD', department: 'Engineering', jobType: 'Full-time', salary: '£35,000 - £45,000' },
  { id: '2', title: 'Senior Product Designer', location: 'London (Hybrid)', department: 'Design', jobType: 'Full-time', salary: '£65,000 - £80,000' },
  { id: '3', title: 'Data Analyst', location: 'Remote', department: 'Data', jobType: 'Part-time', salary: '£40,000 - £50,000' },
];

const Section = styled.section<{ sectionPadding: number }>`
  padding: ${({ sectionPadding }) => sectionPadding}px 40px;
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
`;

const SearchBar = styled.input<{ fontFamily: string; sectionRadius: number }>`
  width: 100%;
  max-width: 400px;
  margin: 16px auto 20px;
  display: block;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: 14px;
`;

const FiltersRow = styled.div<{ fontFamily: string; sectionRadius: number }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  font-family: ${({ fontFamily }) => fontFamily};

  select {
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: ${({ sectionRadius }) => sectionRadius}px;
    font-size: 14px;
    min-width: 120px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const ListColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div<{
  sectionRadius: number;
  cardShadow: string;
  compact: boolean;
  isList: boolean;
  $hoverEffects?: boolean;
}>`
  border: 1px solid #e5e7eb;
  padding: ${({ compact }) => (compact ? '12px 16px' : '20px')};
  border-radius: ${({ sectionRadius }) => sectionRadius}px;
  box-shadow: ${({ cardShadow }) => cardShadow};
  display: flex;
  justify-content: space-between;
  align-items: ${({ compact, isList }) => (compact || isList ? 'center' : 'flex-start')};
  flex-direction: ${({ isList }) => (isList ? 'row' : 'column')};
  gap: ${({ compact }) => (compact ? '0' : '12px')};
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

const CardMain = styled.div`
  flex: 1;
  min-width: 0;
`;

const JobTitle = styled.strong<{ fontFamily: string }>`
  font-family: ${({ fontFamily }) => fontFamily};
  display: block;
  margin-bottom: 4px;
  color: var(--heading);
`;

const Meta = styled.p<{ fontFamily: string }>`
  color: var(--text);
  font-family: ${({ fontFamily }) => fontFamily};
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

const Apply = styled.button<{
  buttonStyle: ButtonSettings['style'];
  cornerRadius: number;
}>`
  background: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${({ buttonStyle, cornerRadius }) =>
    buttonStyle === 'pill' ? '999px' : `${cornerRadius}px`};
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;
`;

interface Props {
  typography: TypographySettings;
  buttons: ButtonSettings;
  layout: LayoutSettings;
}

function JobsSection({ typography, buttons, layout }: Props) {
  const { sectionSettings } = useBuilder();
  const jobsSettings: JobsSectionSettings = sectionSettings?.jobs
    ? { ...DEFAULT_JOBS, ...sectionSettings.jobs }
    : DEFAULT_JOBS;

  const scale = FONT_SCALE_MAP[typography.fontScale];
  const radiusPx = SECTION_RADIUS_PX[layout.sectionRadius];
  const cardShadow = CARD_SHADOW_CSS[layout.cardShadow];
  const isList = jobsSettings.layout === 'list';
  const compact = jobsSettings.cardStyle === 'compact';

  const metaParts: string[] = [];
  if (jobsSettings.showLocation) metaParts.push('location');
  if (jobsSettings.showDepartment) metaParts.push('department');
  if (jobsSettings.showJobType) metaParts.push('jobType');
  if (jobsSettings.showSalary) metaParts.push('salary');

  const renderJobMeta = (job: (typeof MOCK_JOBS)[0]) => {
    const parts: string[] = [];
    if (jobsSettings.showLocation && job.location) parts.push(job.location);
    if (jobsSettings.showDepartment && job.department) parts.push(job.department);
    if (jobsSettings.showJobType && job.jobType) parts.push(job.jobType);
    if (jobsSettings.showSalary && job.salary) parts.push(job.salary);
    return parts.join(' · ');
  };

  return (
    <Section sectionPadding={SECTION_PADDING_PX[layout.sectionPadding]}>
      <ContentWidthWrap contentWidth={CONTENT_WIDTH_PX[layout.contentWidth]}>
        <Title fontSize={scale.h2} fontFamily={typography.headingFont}>
          Open Positions
        </Title>

        {jobsSettings.searchBar && (
          <SearchBar
            type="search"
            placeholder="Search jobs..."
            fontFamily={typography.bodyFont}
            sectionRadius={radiusPx}
          />
        )}

        {jobsSettings.filters && (
          <FiltersRow fontFamily={typography.bodyFont} sectionRadius={radiusPx}>
            <select aria-label="Department filter">
              <option value="">All departments</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Data</option>
            </select>
            <select aria-label="Location filter">
              <option value="">All locations</option>
              <option>Manchester</option>
              <option>London</option>
              <option>Remote</option>
            </select>
            <select aria-label="Job type filter">
              <option value="">All types</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </FiltersRow>
        )}

        {isList ? (
          <ListColumn>
            {MOCK_JOBS.map((job) => (
              <Card
                key={job.id}
                sectionRadius={radiusPx}
                cardShadow={cardShadow}
                compact={compact}
                isList={true}
                $hoverEffects={layout.hoverEffects}
              >
                <CardMain>
                  <JobTitle fontFamily={typography.headingFont}>{job.title}</JobTitle>
                  {metaParts.length > 0 && (
                    <Meta fontFamily={typography.bodyFont}>{renderJobMeta(job)}</Meta>
                  )}
                </CardMain>
                <Apply buttonStyle={buttons.style} cornerRadius={buttons.cornerRadius}>
                  Apply
                </Apply>
              </Card>
            ))}
          </ListColumn>
        ) : (
          <CardsGrid>
            {MOCK_JOBS.map((job) => (
              <Card
                key={job.id}
                sectionRadius={radiusPx}
                cardShadow={cardShadow}
                compact={compact}
                isList={false}
                $hoverEffects={layout.hoverEffects}
              >
                <CardMain>
                  <JobTitle fontFamily={typography.headingFont}>{job.title}</JobTitle>
                  {metaParts.length > 0 && (
                    <Meta fontFamily={typography.bodyFont}>{renderJobMeta(job)}</Meta>
                  )}
                </CardMain>
                <Apply buttonStyle={buttons.style} cornerRadius={buttons.cornerRadius}>
                  Apply
                </Apply>
              </Card>
            ))}
          </CardsGrid>
        )}
      </ContentWidthWrap>
    </Section>
  );
}

export default memo(JobsSection);
