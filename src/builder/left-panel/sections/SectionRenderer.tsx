'use client';
import styled from 'styled-components';
import type { SectionKey } from './SectionsNav';

const Container = styled.div`
  padding: 24px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
`;

const SettingGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
`;

interface Props {
  section: SectionKey;
}

export default function SectionRenderer({ section }: Props) {
  switch (section) {
    case 'hero':
      return (
        <Container>
          <Title>Hero Section</Title>
          <Description>Configure the main hero banner at the top of your careers page.</Description>
          <SettingGroup>
            <Label>Headline</Label>
            <Input placeholder="Build the Future With Us" />
          </SettingGroup>
          <SettingGroup>
            <Label>Subheadline</Label>
            <Input placeholder="Join a team of innovators" />
          </SettingGroup>
          <SettingGroup>
            <Label>CTA Button Text</Label>
            <Input placeholder="See Open Roles" />
          </SettingGroup>
        </Container>
      );

    case 'about':
      return (
        <Container>
          <Title>About Section</Title>
          <Description>Tell candidates about your company culture and mission.</Description>
          <SettingGroup>
            <Label>Title</Label>
            <Input placeholder="About Us" />
          </SettingGroup>
          <SettingGroup>
            <Label>Description</Label>
            <TextArea placeholder="We are a forward-thinking company..." />
          </SettingGroup>
        </Container>
      );

    case 'benefits':
      return (
        <Container>
          <Title>Benefits Section</Title>
          <Description>Showcase the perks and benefits you offer to employees.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Why Work With Us" />
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
            <Input placeholder="Our Locations" />
          </SettingGroup>
        </Container>
      );

    case 'hiring':
      return (
        <Container>
          <Title>Hiring Process Section</Title>
          <Description>Explain your hiring process to candidates.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Our Hiring Process" />
          </SettingGroup>
        </Container>
      );

    case 'faq':
      return (
        <Container>
          <Title>FAQ Section</Title>
          <Description>Answer common questions from candidates.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Frequently Asked Questions" />
          </SettingGroup>
        </Container>
      );

    case 'dei':
      return (
        <Container>
          <Title>Diversity & Inclusion Section</Title>
          <Description>Highlight your commitment to diversity and inclusion.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Diversity & Inclusion" />
          </SettingGroup>
        </Container>
      );

    case 'videos':
      return (
        <Container>
          <Title>Videos Section</Title>
          <Description>Showcase video content about your company.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Watch Our Videos" />
          </SettingGroup>
        </Container>
      );

    case 'testimonials':
      return (
        <Container>
          <Title>Testimonials Section</Title>
          <Description>Display testimonials from current employees.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="What Our Team Says" />
          </SettingGroup>
        </Container>
      );

    case 'team':
      return (
        <Container>
          <Title>Team Section</Title>
          <Description>Introduce key team members and leadership.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Meet Our Team" />
          </SettingGroup>
        </Container>
      );

    case 'jobs':
      return (
        <Container>
          <Title>Jobs Section</Title>
          <Description>List open positions and job opportunities.</Description>
          <SettingGroup>
            <Label>Section Title</Label>
            <Input placeholder="Open Positions" />
          </SettingGroup>
        </Container>
      );

    case 'alerts':
      return (
        <Container>
          <Title>Alerts Section</Title>
          <Description>Display important announcements and alerts.</Description>
          <Description>Alerts are managed in the section preview. Add or remove alerts from there.</Description>
        </Container>
      );

    case 'apply':
      return (
        <Container>
          <Title>Application Form</Title>
          <Description>Configure the job application form.</Description>
          <SettingGroup>
            <Label>Form Title</Label>
            <Input placeholder="Apply Now" />
          </SettingGroup>
        </Container>
      );

    case 'analytics':
      return (
        <Container>
          <Title>Analytics</Title>
          <Description>Track page views, conversions, and candidate engagement.</Description>
          <Description>Analytics integration coming soon. Connect Google Analytics or other tracking tools.</Description>
        </Container>
      );

    case 'footer':
      return (
        <Container>
          <Title>Footer Section</Title>
          <Description>Configure footer content and links.</Description>
          <SettingGroup>
            <Label>Copyright Text</Label>
            <Input placeholder="© 2024 All rights reserved." />
          </SettingGroup>
        </Container>
      );

    case 'seo':
      return (
        <Container>
          <Title>SEO Settings</Title>
          <Description>Optimize your careers page for search engines.</Description>
          <SettingGroup>
            <Label>Page Title</Label>
            <Input placeholder="Careers - Company Name" />
          </SettingGroup>
          <SettingGroup>
            <Label>Meta Description</Label>
            <TextArea placeholder="Join our team and build the future..." />
          </SettingGroup>
        </Container>
      );

    case 'css':
      return (
        <Container>
          <Title>Custom CSS</Title>
          <Description>Add custom CSS to further customize your careers page.</Description>
          <SettingGroup>
            <Label>Custom CSS</Label>
            <TextArea placeholder="/* Add your custom CSS here */" />
          </SettingGroup>
        </Container>
      );

    default:
      return (
        <Container>
          <Title>Section Settings</Title>
          <Description>Settings coming soon for this section.</Description>
        </Container>
      );
  }
}
