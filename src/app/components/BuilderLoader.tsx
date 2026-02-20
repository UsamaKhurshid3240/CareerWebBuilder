'use client';

import { useState, useEffect, useCallback } from 'react';
import Loader from '@/app/components/Loader';

type BuilderComponent = React.ComponentType;

export default function BuilderLoader() {
  const [Component, setComponent] = useState<BuilderComponent | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [key, setKey] = useState(0);

  const load = useCallback(() => {
    setError(null);
    setComponent(null);
    import('@/builder')
      .then((mod) => setComponent(() => mod.default))
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))));
  }, []);

  useEffect(() => {
    load();
  }, [load, key]);

  const retry = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(244, 245, 247, 0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ margin: '0 0 12px', fontSize: 18, color: '#111827' }}>
          Failed to load the builder
        </h2>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: 14,
            color: '#6b7280',
            maxWidth: 420,
            textAlign: 'center',
          }}
        >
          {error.message}
        </p>
        <button
          type="button"
          onClick={retry}
          style={{
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 600,
            color: '#fff',
            background: '#2563eb',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!Component) {
    return <Loader fullPage message="Loading builder…" size="lg" />;
  }

  return <Component />;
}
