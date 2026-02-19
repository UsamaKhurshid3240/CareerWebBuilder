'use client';

import styled from 'styled-components';

import ThemePresets from './ThemePresets';
import BrandIdentity from './BrandIdentity';
import ColorsSection from './ColorsSection';

const Container = styled.div`
  padding: 16px;
`;

export default function ThemeTab() {
  return (
    <Container>
      <ThemePresets />
      <BrandIdentity />
      <ColorsSection />
    </Container>
  );
}
