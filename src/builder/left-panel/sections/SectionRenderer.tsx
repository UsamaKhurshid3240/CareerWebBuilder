'use client';

import styled from 'styled-components';
import { RADIUS, SPACING } from '@/lib/constants/glassUI';
import { BUILDER_TYPO } from '@/lib/constants/typography';
import { Label, Input, Textarea } from '@/builder/components/section-settings/FormControls';
import type { SectionKey } from './SectionsNav';

const Container = styled.div`
  padding: ${SPACING.xl}px;
`;

const OpenLayoutCta = styled.div`
  padding: ${SPACING.md}px;
  margin-bottom: ${SPACING.xl}px;
  background: ${(p) => p.theme.shellBg};
  border: 1px solid ${(p) => p.theme.inputBorder};
  border-radius: ${RADIUS.md};
  font-size: ${BUILDER_TYPO.helper};
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const Title = styled.h3`
  font-size: ${BUILDER_TYPO.heading};
  font-weight: 600;
  margin-bottom: ${SPACING.md}px;
  color: ${(p) => p.theme.heading};
`;

const Description = styled.p`
  font-size: ${BUILDER_TYPO.body};
  color: ${(p) => p.theme.muted};
  margin-bottom: ${SPACING.xl}px;
`;

const SettingGroup = styled.div`
  margin-bottom: ${SPACING.xl}px;
`;

interface Props {
  section: SectionKey;
}

export default function SectionRenderer({ section }: Props) {
  const layoutCta = (
    <OpenLayoutCta>
      <strong>Open Layout tab</strong> → Section order &amp; pages → click the settings icon (⠿) next to a section to edit its content and options.
    </OpenLayoutCta>
  );

  switch (section) {
    case 'hero':
      return (
        <Container>
          {layoutCta}
          <Title>Hero Section</Title>
          <Description>Configure the main hero banner at the top of your careers page.</Description>
          <SettingGroup>
            <Label>Headline</Label>
            <Input placeholder="Build the Future With Us" readOnly />
          </SettingGroup>
          <SettingGroup>
            <Label>Subheadline</Label>
            <Input placeholder="Join a team of innovators" readOnly />
          </SettingGroup>
          <SettingGroup>
            <Label>CTA Button Text</Label>
            <Input placeholder="See Open Roles" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'about':
      return (
        <Container>
          {layoutCta}
          <Title>About Section</Title>
          <Description>Tell candidates about your company culture and mission.</Description>
          <SettingGroup>
            <Label>Title</Label>
            <Input placeholder="About Us" readOnly />
          </SettingGroup>
          <SettingGroup>
            <Label>Description</Label>
            <Textarea placeholder="We are a forward-thinking company..." readOnly rows={4} />
          </SettingGroup>
        </Container>
      );

    case 'benefits':
      return (
        <Container>
          {layoutCta}
          <Title>Benefits Section</Title>
          <Description>Showcase the perks and benefits you offer to employees.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Why Work With Us" readOnly />
          </SettingGroup>
          <Description>Benefits are managed in the section preview. Add, edit, or remove benefits from there.</Description>
        </Container>
      );

    case 'locations':
      return (
        <Container>
          <Title>Locations Section</Title>
          <Description>Display your office locations and remote work options.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Our Locations" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'hiring':
      return (
        <Container>
          {layoutCta}
          <Title>Hiring Process Section</Title>
          <Description>Explain your hiring process to candidates.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Our Hiring Process" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'faq':
      return (
        <Container>
          {layoutCta}
          <Title>FAQ Section</Title>
          <Description>Answer common questions from candidates.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Frequently Asked Questions" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'dei':
      return (
        <Container>
          {layoutCta}
          <Title>Diversity & Inclusion Section</Title>
          <Description>Highlight your commitment to diversity and inclusion.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Diversity & Inclusion" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'videos':
      return (
        <Container>
          {layoutCta}
          <Title>Videos Section</Title>
          <Description>Showcase video content about your company.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Watch Our Videos" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'testimonials':
      return (
        <Container>
          {layoutCta}
          <Title>Testimonials Section</Title>
          <Description>Display testimonials from current employees.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="What Our Team Says" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'team':
      return (
        <Container>
          {layoutCta}
          <Title>Team Section</Title>
          <Description>Introduce key team members and leadership.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Meet Our Team" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'jobs':
      return (
        <Container>
          {layoutCta}
          <Title>Jobs Section</Title>
          <Description>List open positions and job opportunities.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Open Positions" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'alerts':
      return (
        <Container>
          {layoutCta}
          <Title>Alerts Section</Title>
          <Description>Display important announcements and alerts.</Description>
          <Description>Alerts are managed in the section preview. Add or remove alerts from there.</Description>
        </Container>
      );

    case 'apply':
      return (
        <Container>
          {layoutCta}
          <Title>Application Form</Title>
          <Description>Configure the job application form.</Description>
          <SettingGroup>
            <Label>Form Title</Label>
            <Input placeholder="Apply Now" readOnly />
          </SettingGroup>
        </Container>
      );

    case 'analytics':
      return (
        <Container>
          {layoutCta}
          <Title>Analytics</Title>
          <Description>Track page views, conversions, and candidate engagement.</Description>
          <Description>Analytics integration coming soon. Connect Google Analytics or other tracking tools.</Description>
        </Container>
      );

    case 'footer':
      return (
        <Container>
          {layoutCta}
          <Title>Footer Section</Title>
          <Description>Configure footer content and links.</Description>
          <SettingGroup>
            <Label>Copyright Text</Label>
            <Input placeholder="© 2024 All rights reserved." readOnly />
          </SettingGroup>
        </Container>
      );

    case 'seo':
      return (
        <Container>
          {layoutCta}
          <Title>SEO Settings</Title>
          <Description>Optimize your careers page for search engines.</Description>
          <SettingGroup>
            <Label>Page Title</Label>
            <Input placeholder="Careers - Company Name" readOnly />
          </SettingGroup>
          <SettingGroup>
            <Label>Meta Description</Label>
            <Textarea placeholder="Join our team and build the future..." readOnly rows={4} />
          </SettingGroup>
        </Container>
      );

    case 'css':
      return (
        <Container>
          {layoutCta}
          <Title>Custom CSS</Title>
          <Description>Add custom CSS to further customize your careers page.</Description>
          <SettingGroup>
            <Label>Custom CSS</Label>
            <Textarea placeholder="/* Add your custom CSS here */" readOnly rows={6} />
          </SettingGroup>
        </Container>
      );

    default:
      return (
        <Container>
          {layoutCta}
          <Title>Section Settings</Title>
          <Description>Settings coming soon for this section.</Description>
        </Container>
      );
  }
}
