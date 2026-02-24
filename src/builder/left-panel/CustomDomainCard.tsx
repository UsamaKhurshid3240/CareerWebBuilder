'use client';

import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { RADIUS, SPACING, SHADOW } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';

const ACCENT = '#1e3356';
const DNS_RECORDS = [
  { type: 'A', name: '@', value: '185.158.133.1' },
  { type: 'A', name: 'www', value: '185.158.133.1' },
  { type: 'TXT', name: '_careers-verify', value: 'careers_verify=615948a16ea640dbac7ac2ac75b946a8' },
] as const;

/* ----- Card (default view) ----- */
const Card = styled.div`
  ${(p) => p.theme.glass.card}
  border-radius: ${RADIUS.lg};
  padding: 22px;
  margin-bottom: 18px;
  &:hover {
    ${(p) => p.theme.glass.cardHover}
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.sm}px;
  margin-bottom: ${SPACING.xs}px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  line-height: 1.3;
`;

const Description = styled.p`
  margin: 0 0 ${SPACING.xl}px;
  font-size: 14px;
  font-weight: 400;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const ConnectBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.xs}px;
  height: 36px;
  padding: 0 ${SPACING.md}px;
  background: ${ACCENT};
  color: ${(p) => p.theme.tabActiveText};
  border: none;
  border-radius: ${RADIUS.sm};
  font-size: ${BUILDER_TYPO.label};
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: filter 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    filter: brightness(1.08);
    box-shadow: 0 2px 8px rgba(30, 51, 86, 0.35);
  }
  &:active {
    filter: brightness(0.96);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${SPACING.xxl}px ${SPACING.md}px;
  text-align: center;
`;

const EmptyIconWrap = styled.div`
  color: ${(p) => p.theme.muted};
  margin-bottom: ${SPACING.md}px;
  opacity: 0.6;
`;

const EmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  margin-bottom: ${SPACING.xs}px;
`;

const EmptySub = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
  max-width: 280px;
`;

/* Inline flow (below header) */
const FlowBody = styled.div`
  padding: ${SPACING.lg}px 0 0;
  border-top: 1px solid ${(p) => p.theme.panelBorder};
  margin-top: ${SPACING.sm}px;
`;

/* Step indicator */
const StepsWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  margin-bottom: ${SPACING.xl}px;
  padding: ${SPACING.md}px ${SPACING.lg}px;
  background: ${(p) => p.theme.shellBg};
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.panelBorder};
`;

const StepNum = styled.span<{ active?: boolean; done?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  background: ${({ active, done, theme }) =>
    done ? theme.success : active ? ACCENT : 'transparent'};
  color: ${({ active, done }) => (active || done ? '#fff' : 'inherit')};
  border: ${({ active, done }) =>
    !active && !done ? '2px solid currentColor' : 'none'};
  color: ${({ active, done, theme }) =>
    active || done ? '#fff' : theme.muted};
`;

const StepLabel = styled.span<{ done?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => (p.done ? p.theme.body : p.theme.muted)};
  margin-left: 6px;
`;

const StepItem = styled.div<{ active?: boolean; done?: boolean }>`
  display: flex;
  align-items: center;
  ${(p) => p.done && `color: ${p.theme.body};`}
`;

const StepArrow = styled.span`
  color: ${(p) => p.theme.muted};
  margin: 0 ${SPACING.xs}px;
  font-size: 12px;
`;

/* Step 1: Enter Domain */
const FieldLabel = styled.label`
  display: block;
  font-size: ${BUILDER_TYPO.label};
  font-weight: 500;
  color: ${(p) => p.theme.heading};
  margin-bottom: ${SPACING.xs}px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  border-radius: ${RADIUS.sm};
  background: ${(p) => p.theme.panelBg};
  color: ${(p) => p.theme.body};
  margin-bottom: ${SPACING.sm}px;

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 2px ${(p) => p.theme.inputFocus}22;
  }
`;

const InputHint = styled.p`
  margin: 0 0 ${SPACING.lg}px;
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.md}px;
  flex-wrap: wrap;
`;

const BtnPrimary = styled.button`
  padding: 10px 20px;
  font-size: ${BUILDER_TYPO.label};
  font-weight: 600;
  background: ${ACCENT};
  color: #fff;
  border: none;
  border-radius: ${RADIUS.sm};
  cursor: pointer;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.08);
  }
`;

const BtnCancel = styled.button`
  padding: 10px 0;
  font-size: ${BUILDER_TYPO.label};
  font-weight: 500;
  background: none;
  border: none;
  color: ${(p) => p.theme.muted};
  cursor: pointer;

  &:hover {
    color: ${(p) => p.theme.heading};
    text-decoration: underline;
  }
`;

/* Step 2: Configure DNS */
const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.sm}px;
  padding: ${SPACING.md}px ${SPACING.lg}px;
  background: rgba(30, 51, 86, 0.08);
  border: 1px solid rgba(30, 51, 86, 0.15);
  border-radius: ${RADIUS.md};
  margin-bottom: ${SPACING.lg}px;
  font-size: 13px;
  color: ${(p) => p.theme.body};
  line-height: 1.5;
`;

const InfoIcon = styled.span`
  color: ${ACCENT};
  font-weight: 700;
  flex-shrink: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${SPACING.xl}px;
  font-size: 13px;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  color: ${(p) => p.theme.muted};
  border-bottom: 1px solid ${(p) => p.theme.panelBorder};
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid ${(p) => p.theme.panelBorder};
  color: ${(p) => p.theme.body};
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  background: ${(p) => p.theme.borderSubtle};
  color: ${(p) => p.theme.muted};
  border-radius: ${RADIUS.sm};
`;

const CopyBtn = styled.button`
  padding: 6px;
  border: none;
  background: none;
  color: ${(p) => p.theme.muted};
  cursor: pointer;
  border-radius: ${RADIUS.sm};

  &:hover {
    color: ${(p) => p.theme.heading};
    background: ${(p) => p.theme.rowHover};
  }
`;

/* Step 3: Verify / Complete */
const CompleteBlock = styled.div`
  text-align: center;
  padding: ${SPACING.xl}px 0;
  margin-bottom: ${SPACING.lg}px;
`;

const CheckIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto ${SPACING.md}px;
  border-radius: 50%;
  background: ${(p) => p.theme.success};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
`;

const CompleteTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
  margin-bottom: ${SPACING.xs}px;
`;

const CompleteText = styled.p`
  margin: 0 0 ${SPACING.lg}px;
  font-size: 14px;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const BtnWithIcon = styled(BtnPrimary)`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.xs}px;
`;

const BtnSecondary = styled.button`
  padding: 10px 20px;
  font-size: ${BUILDER_TYPO.label};
  font-weight: 500;
  background: ${(p) => p.theme.panelBg};
  color: ${(p) => p.theme.heading};
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.sm};
  cursor: pointer;
  margin-left: ${SPACING.sm}px;

  &:hover {
    background: ${(p) => p.theme.rowHover};
  }
`;

/* Domain card (step 3 bottom + after Done) */
const DomainCard = styled.div`
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.md};
  padding: ${SPACING.lg}px;
  background: ${(p) => p.theme.shellBg};
  margin-top: ${SPACING.lg}px;
`;

const DomainCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${SPACING.sm}px;
  margin-bottom: ${SPACING.md}px;
`;

const DomainNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
`;

const DomainName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.theme.heading};
`;

const DomainBadge = styled.span`
  font-size: 12px;
  color: ${(p) => p.theme.muted};
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${(p) => p.theme.muted};
`;

const DomainActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm}px;
  flex-wrap: wrap;
`;

const BtnGhost = styled.button`
  padding: 8px 12px;
  font-size: 13px;
  background: none;
  border: 1px solid ${(p) => p.theme.panelBorder};
  border-radius: ${RADIUS.sm};
  color: ${(p) => p.theme.heading};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${(p) => p.theme.rowHover};
  }
`;

const BtnDanger = styled.button`
  padding: 8px 12px;
  font-size: 13px;
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    text-decoration: underline;
  }
`;

function GlobeIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CheckIconSvg({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function RefreshIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ClockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function copyToClipboard(text: string): void {
  if (typeof navigator?.clipboard?.writeText === 'function') {
    navigator.clipboard.writeText(text);
  }
}

export default function CustomDomainCard() {
  const [flowOpen, setFlowOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [domainName, setDomainName] = useState('careers.com');
  const [connectedDomain, setConnectedDomain] = useState<string | null>(null);
  const [dnsRecordsVisible, setDnsRecordsVisible] = useState(true);

  const openFlow = useCallback(() => {
    setFlowOpen(true);
    setStep(1);
    setDomainName('careers.com');
  }, []);

  const closeFlow = useCallback(() => {
    setFlowOpen(false);
    setStep(1);
  }, []);

  const onContinueFromStep1 = useCallback(() => {
    if (domainName.trim()) setStep(2);
  }, [domainName]);

  const onContinueFromStep2 = useCallback(() => {
    setStep(3);
  }, []);

  const onDone = useCallback(() => {
    setConnectedDomain(domainName.trim() || 'careers.com');
    setFlowOpen(false);
    setStep(1);
  }, [domainName]);

  const onRemoveDomain = useCallback(() => {
    setConnectedDomain(null);
    setDnsRecordsVisible(true);
  }, []);

  const renderStepIndicator = () => (
    <StepsWrap>
      <StepItem done={step > 1} active={step === 1}>
        <StepNum active={step === 1} done={step > 1}>
          {step > 1 ? <CheckIconSvg size={14} /> : '1'}
        </StepNum>
        <StepLabel done={step > 1}>Enter Domain</StepLabel>
      </StepItem>
      <StepArrow>→</StepArrow>
      <StepItem done={step > 2} active={step === 2}>
        <StepNum active={step === 2} done={step > 2}>
          {step > 2 ? <CheckIconSvg size={14} /> : '2'}
        </StepNum>
        <StepLabel done={step > 2}>Configure DNS</StepLabel>
      </StepItem>
      <StepArrow>→</StepArrow>
      <StepItem active={step === 3}>
        <StepNum active={step === 3}>3</StepNum>
        <StepLabel>Verify</StepLabel>
      </StepItem>
    </StepsWrap>
  );

  const renderDnsTable = () => (
    <Table>
      <thead>
        <tr>
          <Th>Type</Th>
          <Th>Name</Th>
          <Th>Value</Th>
          <Th style={{ width: 40 }} />
        </tr>
      </thead>
      <tbody>
        {DNS_RECORDS.map((r, i) => (
          <tr key={i}>
            <Td><TypeBadge>{r.type}</TypeBadge></Td>
            <Td>{r.name}</Td>
            <Td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.value}</Td>
            <Td>
              <CopyBtn type="button" onClick={() => copyToClipboard(r.value)} aria-label="Copy">
                <CopyIcon size={16} />
              </CopyBtn>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const showEmpty = !connectedDomain && !flowOpen;

  const flowContent = flowOpen && (
    <FlowBody>
      {renderStepIndicator()}

      {step === 1 && (
        <>
          <FieldLabel htmlFor="custom-domain-input">Domain Name</FieldLabel>
          <Row>
            <Input
              id="custom-domain-input"
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              placeholder="careers.company.com"
            />
            <BtnPrimary type="button" onClick={onContinueFromStep1}>
              Continue
            </BtnPrimary>
          </Row>
          <InputHint>
            Enter a domain or subdomain you own. Both root domains (company.com) and subdomains (careers.company.com) are supported.
          </InputHint>
          <BtnCancel type="button" onClick={closeFlow}>Cancel</BtnCancel>
        </>
      )}

      {step === 2 && (
        <>
          <InfoBanner>
            <InfoIcon>ℹ</InfoIcon>
            <span>
              Add these DNS records at your domain registrar (e.g. GoDaddy, Cloudflare, Namecheap). Changes may take up to 48 hours to propagate.
            </span>
          </InfoBanner>
          {renderDnsTable()}
          <Row>
            <BtnPrimary type="button" onClick={onContinueFromStep2}>
              I've added these records
            </BtnPrimary>
            <BtnCancel type="button" onClick={closeFlow}>Cancel</BtnCancel>
          </Row>
        </>
      )}

      {step === 3 && (
        <>
          <CompleteBlock>
            <CheckIcon><CheckIconSvg size={28} /></CheckIcon>
            <CompleteTitle>Domain Setup Complete</CompleteTitle>
            <CompleteText>
              Click verify to check your DNS configuration. It may take a few minutes for records to propagate.
            </CompleteText>
            <Row style={{ justifyContent: 'center', marginBottom: 0 }}>
              <BtnWithIcon type="button">
                <RefreshIcon size={16} />
                Verify DNS
              </BtnWithIcon>
              <BtnSecondary type="button" onClick={onDone}>
                Done
              </BtnSecondary>
            </Row>
          </CompleteBlock>

          <DomainCard>
            <DomainCardHeader>
              <DomainNameRow>
                <GlobeIcon size={18} />
                <div>
                  <DomainName>{domainName || 'careers.com'}</DomainName>
                  <DomainBadge style={{ display: 'block' }}>Custom Domain</DomainBadge>
                </div>
              </DomainNameRow>
              <StatusBadge>
                <ClockIcon />
                Pending Setup
              </StatusBadge>
            </DomainCardHeader>
            <DomainActions>
              <BtnGhost type="button"><RefreshIcon size={14} /> Verify DNS</BtnGhost>
              <BtnGhost type="button" onClick={() => setDnsRecordsVisible(!dnsRecordsVisible)}>
                {dnsRecordsVisible ? 'Hide DNS Records' : 'Show DNS Records'}
              </BtnGhost>
              <BtnDanger type="button" onClick={onRemoveDomain}><TrashIcon /> Remove</BtnDanger>
            </DomainActions>
            {dnsRecordsVisible && renderDnsTable()}
          </DomainCard>
        </>
      )}
    </FlowBody>
  );

  return (
    <Card>
      <HeaderRow>
        <HeaderLeft>
          <GlobeIcon size={20} />
          <Title>Custom Domain</Title>
        </HeaderLeft>
        {(!connectedDomain || flowOpen) && (
          <ConnectBtn type="button" onClick={flowOpen ? closeFlow : openFlow}>
            {flowOpen ? 'Cancel' : <><PlusIcon size={16} /> Connect Domain</>}
          </ConnectBtn>
        )}
      </HeaderRow>
      <Description>
        Host your careers page on your own domain (e.g. careers.company.com)
      </Description>

      {flowContent}

      {showEmpty && (
        <EmptyState>
          <EmptyIconWrap>
            <GlobeIcon size={48} />
          </EmptyIconWrap>
          <EmptyTitle>No custom domains connected</EmptyTitle>
          <EmptySub>
            Connect a domain to serve your careers page from your own URL
          </EmptySub>
        </EmptyState>
      )}

      {connectedDomain && !flowOpen && (
        <DomainCard>
          <DomainCardHeader>
            <DomainNameRow>
              <GlobeIcon size={18} />
              <div>
                <DomainName>{connectedDomain}</DomainName>
                <DomainBadge style={{ display: 'block' }}>Custom Domain</DomainBadge>
              </div>
            </DomainNameRow>
            <StatusBadge>
              <ClockIcon />
              Pending Setup
            </StatusBadge>
          </DomainCardHeader>
          <DomainActions>
            <BtnGhost type="button"><RefreshIcon size={14} /> Verify DNS</BtnGhost>
            <BtnGhost type="button" onClick={() => setDnsRecordsVisible(!dnsRecordsVisible)}>
              {dnsRecordsVisible ? 'Hide DNS Records' : 'Show DNS Records'}
            </BtnGhost>
            <BtnDanger type="button" onClick={onRemoveDomain}><TrashIcon /> Remove</BtnDanger>
          </DomainActions>
          {dnsRecordsVisible && renderDnsTable()}
        </DomainCard>
      )}
    </Card>
  );
}
