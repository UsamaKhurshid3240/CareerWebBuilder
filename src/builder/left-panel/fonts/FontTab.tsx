'use client';

import styled from 'styled-components';
import TypographySection from './TypographySection';
import ButtonStylesSection from './ButtonStylesSection';

const Container = styled.div`
  padding: 16px;
`;

export default function FontTab() {
  return (
    <Container>
      <TypographySection />
      <ButtonStylesSection />
    </Container>
  );
}
