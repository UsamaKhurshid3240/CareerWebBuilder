'use client';

import styled from 'styled-components';

const Header = styled.header`
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #111827;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AppHeader() {
  return (
    <Header>
      <Inner>
        <Left>
          <Logo>UK</Logo>
        </Left>
      </Inner>
    </Header>
  );
}
