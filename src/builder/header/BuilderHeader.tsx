'use client';

import styled from 'styled-components';
import HeaderTop from '@/builder/header/HeaderTop';
import HeaderActions from '@/builder/header/HeaderActions';

const Wrapper = styled.header`
  position: relative;
`;

interface BuilderHeaderProps {
  splitView: boolean;
  setSplitView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BuilderHeader({
  splitView,
  setSplitView,
}: BuilderHeaderProps) {
  return (
    <Wrapper>
      <HeaderTop splitView={splitView} setSplitView={setSplitView} />
      <HeaderActions />
    </Wrapper>
  );
}
