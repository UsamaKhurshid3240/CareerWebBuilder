'use client';

import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { RADIUS, TRANSITION, SHADOW, BLUR } from '@/lib/constants/glassUI';
import { MODAL_SPACING } from '@/builder/components/section-settings/SectionSettingsModal';
import SectionSettingsTabs from '@/builder/components/section-settings/SectionSettingsTabs';
import { useBuilder } from '@/builder/context/BuilderContext';
import { IconImage, SearchIcon } from '@/builder/icons';
import {
  IMAGE_LIBRARY,
  IMAGE_LIBRARY_CATEGORIES,
  type ImageLibraryCategory,
  type ImageLibraryItem,
} from '@/lib/constants/imageLibrary';

const overlayEnter = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalEnter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97) translateY(-12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${(p) => p.theme.overlay};
  backdrop-filter: blur(${BLUR.xl});
  -webkit-backdrop-filter: blur(${BLUR.xl});
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 24px;
  overflow-y: auto;
  box-sizing: border-box;
  animation: ${overlayEnter} 0.22s ease-out forwards;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 720px;
  max-height: min(70vh, 560px);
  min-width: 0;
  background: ${(p) => p.theme.modalFooterBg};
  border-radius: ${RADIUS.xl};
  box-shadow: ${SHADOW.lg}, 0 0 0 1px ${(p) => p.theme.borderSubtle};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(p) => p.theme.panelBorder};
  animation: ${modalEnter} 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

const Header = styled.div`
  padding: ${MODAL_SPACING.headerPadding}px ${MODAL_SPACING.bodyPadding}px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  min-width: 0;
`;

const TitleBlock = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
  flex: 1;
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.shellBg};
  border-radius: ${RADIUS.md};
  flex-shrink: 0;
  box-shadow: ${SHADOW.xs};
  border: 1px solid ${(p) => p.theme.borderSubtle};
  color: ${(p) => p.theme.heading};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.heading};
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: ${(p) => p.theme.muted};
  line-height: 1.5;
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${(p) => p.theme.shellBg};
  color: ${(p) => p.theme.muted};
  border-radius: ${RADIUS.md};
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${TRANSITION.fast}, color ${TRANSITION.fast};

  &:hover {
    background: ${(p) => p.theme.panelBorder};
    color: ${(p) => p.theme.heading};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.inputFocus};
  }
`;

const Body = styled.div`
  padding: ${MODAL_SPACING.sectionGap}px ${MODAL_SPACING.bodyPadding}px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px 0 40px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  font-size: 14px;
  color: ${(p) => p.theme.heading};
  background: ${(p) => p.theme.cardBg};
  transition: border-color ${TRANSITION.fast}, box-shadow ${TRANSITION.fast};

  &::placeholder {
    color: ${(p) => p.theme.muted};
  }
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
`;

const SearchWrap = styled.div`
  position: relative;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${(p) => p.theme.muted};
  }
`;

const ApplyToLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.theme.heading};
  display: block;
  margin-bottom: 8px;
`;

const ApplyToSelect = styled.select`
  height: 40px;
  padding: 0 12px;
  border-radius: ${RADIUS.md};
  border: 1px solid ${(p) => p.theme.inputBorder};
  font-size: 14px;
  color: ${(p) => p.theme.heading};
  background: ${(p) => p.theme.cardBg};
  min-width: 180px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;

const Card = styled.button`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: ${RADIUS.lg};
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  background: ${(p) => p.theme.panelBorder};
  transition: transform ${TRANSITION.fast}, box-shadow ${TRANSITION.fast}, border-color ${TRANSITION.fast};

  &:hover {
    transform: scale(1.02);
    box-shadow: ${SHADOW.md};
    border-color: ${(p) => p.theme.inputFocus};
  }
  &:focus-visible {
    outline: none;
    border-color: ${(p) => p.theme.inputFocus};
    box-shadow: 0 0 0 3px ${(p) => p.theme.inputFocus}22;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardCaption = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 12px 10px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  color: ${(p) => p.theme.cardBg};
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  line-height: 1.3;
`;

const Footer = styled.div`
  padding: 12px ${MODAL_SPACING.bodyPadding}px 20px;
  border-top: 1px solid ${(p) => p.theme.panelBorder};
  background: ${(p) => p.theme.modalFooterBg};
  flex-shrink: 0;
  text-align: center;
  font-size: 13px;
  color: ${(p) => p.theme.muted};
`;

const FooterLink = styled.a`
  color: ${(p) => p.theme.inputFocus};
  text-decoration: underline;
  margin-left: 4px;

  &:hover {
    text-decoration: none;
  }
`;

export type ImageLibraryApplyTarget = 'hero-background' | 'about-image';

const APPLY_TARGETS: { value: ImageLibraryApplyTarget; label: string }[] = [
  { value: 'hero-background', label: 'Hero section background' },
  { value: 'about-image', label: 'About section image' },
];

interface ImageLibraryModalProps {
  onClose: () => void;
}

export default function ImageLibraryModal({ onClose }: ImageLibraryModalProps) {
  const { sectionSettings, applyChangeDirect } = useBuilder();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ImageLibraryCategory>('all');
  const [applyTo, setApplyTo] = useState<ImageLibraryApplyTarget>('hero-background');

  const filtered = useMemo(() => {
    let list = IMAGE_LIBRARY;
    if (category !== 'all') {
      list = list.filter((img) => img.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (img) =>
          img.caption.toLowerCase().includes(q) || img.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, search]);

  const handleSelect = (item: ImageLibraryItem) => {
    const url = item.url;
    const prev = sectionSettings ?? {};

    if (applyTo === 'hero-background') {
      applyChangeDirect({
        sectionSettings: {
          ...prev,
          hero: prev.hero
            ? { ...prev.hero, backgroundImage: url, backgroundType: 'image' as const }
            : undefined,
        },
      });
    } else {
      applyChangeDirect({
        sectionSettings: {
          ...prev,
          about: prev.about ? { ...prev.about, imageUrl: url } : undefined,
        },
      });
    }
    onClose();
  };

  const modalContent = (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleBlock>
            <IconWrap>
              <IconImage size={22} />
            </IconWrap>
            <div>
              <Title>Image Library</Title>
              <Subtitle>Choose from curated stock photos for your careers page.</Subtitle>
            </div>
          </TitleBlock>
          <CloseBtn type="button" onClick={onClose} aria-label="Close">
            ×
          </CloseBtn>
        </Header>

        <Body>
          <SearchWrap>
            <SearchIcon className="search-icon" size={20} aria-hidden />
            <SearchInput
              type="search"
              placeholder="Search images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search images"
            />
          </SearchWrap>

          <SectionSettingsTabs
            tabs={IMAGE_LIBRARY_CATEGORIES.map(({ value, label }) => ({ id: value, label }))}
            activeId={category}
            onChange={(id) => setCategory(id as ImageLibraryCategory)}
          />

          

          <Grid>
            {filtered.map((item) => (
              <Card
                key={item.id}
                type="button"
                onClick={() => handleSelect(item)}
                title={item.caption}
              >
                <CardImg src={item.url} alt={item.caption} loading="lazy" />
                <CardCaption>{item.caption}</CardCaption>
              </Card>
            ))}
          </Grid>
        </Body>

        <Footer>
          Photos provided by
          <FooterLink
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Unsplash (opens in new tab)"
          >
            Unsplash
          </FooterLink>
        </Footer>
      </Modal>
    </Overlay>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
