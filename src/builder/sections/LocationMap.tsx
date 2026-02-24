'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { LocationsMapType } from '@/lib/types/builder';
import { SECTION_RADIUS_PX } from '@/lib/constants/layout';

/** Minimal type for Google Maps style (avoids @types/google.maps dependency) */
interface MapTypeStyle {
  featureType?: string;
  elementType?: string;
  stylers?: Array<Record<string, unknown>>;
}

/** Dark map style for Google Maps */
const DARK_MAP_STYLES: MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
];

const MapWrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 320px;
  border-radius: ${SECTION_RADIUS_PX.medium}px;
  overflow: hidden;
  background: #e5e7eb;
`;

interface LocationMapProps {
  lat: number;
  lng: number;
  zoom: number;
  mapType: LocationsMapType;
  mapControls: boolean;
  sectionRadius?: number;
}

export default function LocationMap({
  lat,
  lng,
  zoom,
  mapType,
  mapControls,
  sectionRadius = 12,
}: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ setCenter: (c: { lat: number; lng: number }) => void; setZoom: (z: number) => void; setOptions: (o: Record<string, unknown>) => void } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const apiKey =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : '';

  useEffect(() => {
    if (!apiKey || !containerRef.current) return;

    const g = (window as Window & { google?: { maps: typeof google.maps } }).google;
    const initMap = () => {
      const google = (window as Window & { google?: { maps: { Map: new (el: HTMLElement, o: Record<string, unknown>) => { setCenter: (c: { lat: number; lng: number }) => void; setZoom: (z: number) => void; setOptions: (o: Record<string, unknown>) => void }; Marker: new (o: { position: { lat: number; lng: number }; map: unknown }) => void } } }).google;
      if (!google?.maps || !containerRef.current) return;

      const map = new google.maps.Map(containerRef.current, {
        center: { lat, lng },
        zoom,
        mapTypeControl: mapControls,
        zoomControl: mapControls,
        fullscreenControl: mapControls,
        streetViewControl: false,
        scaleControl: mapControls,
        scrollwheel: true,
        disableDefaultUI: !mapControls,
        styles: mapType === 'dark' ? DARK_MAP_STYLES : mapType === 'light' ? [] : undefined,
      });

      new google.maps.Marker({ position: { lat, lng }, map });

      mapRef.current = map;
      setLoaded(true);
    };

    if (g?.maps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => initMap();
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      mapRef.current = null;
    };
  }, [apiKey, lat, lng]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;
    map.setCenter({ lat, lng });
    map.setZoom(zoom);
  }, [lat, lng, zoom, loaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;
    map.setOptions({
      mapTypeControl: mapControls,
      zoomControl: mapControls,
      fullscreenControl: mapControls,
      scaleControl: mapControls,
      disableDefaultUI: !mapControls,
      styles: mapType === 'dark' ? DARK_MAP_STYLES : mapType === 'light' ? [] : undefined,
    });
  }, [mapControls, mapType, loaded]);

  if (!apiKey) {
    return (
      <MapWrap style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: 14 }}>
        Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment to show the map.
      </MapWrap>
    );
  }

  return <MapWrap ref={containerRef} style={{ borderRadius: sectionRadius }} />;
}
