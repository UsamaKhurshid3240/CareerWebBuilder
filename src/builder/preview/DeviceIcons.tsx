'use client';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const size = 18;

export function MobileIcon({ active }: { active?: boolean }) {
  const color = active ? '#111827' : '#6b7280';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function TabletIcon({ active }: { active?: boolean }) {
  const color = active ? '#111827' : '#6b7280';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function DesktopIcon({ active }: { active?: boolean }) {
  const color = active ? '#111827' : '#6b7280';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function DeviceIcon({ device, active }: { device: DeviceType; active?: boolean }) {
  switch (device) {
    case 'mobile':
      return <MobileIcon active={active} />;
    case 'tablet':
      return <TabletIcon active={active} />;
    case 'desktop':
      return <DesktopIcon active={active} />;
    default:
      return <DesktopIcon active={active} />;
  }
}
