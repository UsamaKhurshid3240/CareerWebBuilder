'use client';

import styled from 'styled-components';
import type { TypographySettings, LayoutSettings } from '@/lib/types/builder';
import { SECTION_RADIUS_PX } from '@/lib/constants/layout';

const Footer = styled.footer<{ fontFamily: string; sectionRadius: number }>`
  background: var(--secondary);
  color: #ffffff;
  text-align: center;
  padding: 18px 16px;
  font-size: 14px;
  font-family: ${({ fontFamily }) => fontFamily};
  border-bottom-left-radius: ${({ sectionRadius }) => sectionRadius}px;
  border-bottom-right-radius: ${({ sectionRadius }) => sectionRadius}px;
`;

interface Props {
  typography: TypographySettings;
  layout: LayoutSettings;
}

export default function FooterSection({ typography, layout }: Props) {
  return (
    <Footer
      fontFamily={typography.bodyFont}
      sectionRadius={SECTION_RADIUS_PX[layout.sectionRadius]}
    >
      © {new Date().getFullYear()} All rights reserved.
    </Footer>
  );
}
