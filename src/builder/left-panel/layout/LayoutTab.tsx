'use client';

import styled from 'styled-components';
import SpacingLayoutSection from '@/builder/left-panel/layout/SpacingLayoutSection';
import GlobalStylesSection from '@/builder/left-panel/layout/GlobalStylesSection';
import GradientBuilderSection from '@/builder/left-panel/layout/GradientBuilderSection';
import SectionOrderPages from '@/builder/left-panel/layout/sections-order-pages/SectionOrderPages';

const Container = styled.div`
  padding: 20px 18px;
`;

export default function LayoutTab(): JSX.Element {
  return (
    <Container>
      <SectionOrderPages />
      <SpacingLayoutSection />
      <GlobalStylesSection />
      <GradientBuilderSection />
    </Container>
  );
}
