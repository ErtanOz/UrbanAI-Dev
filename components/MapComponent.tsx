
import React, { useEffect, useRef } from 'react';
import { EventLocation } from '../types';

interface MapProps {
  locations: EventLocation[];
  selectedLocationId: string | null;
  onSelectLocation: (id: string) => void;
}

const MapComponent: React.FC<MapProps> = ({ locations, selectedLocationId, onSelectLocation }) => {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const mapContainerId = 'green-map';

  useEffect(() => {
    const L = (window as any).L;
    if (!L) return;

    // Initialize map
    const map = L.map(mapContainerId, {
      zoomControl: false,
      attributionControl: false
    }).setView([50.9375, 6.9603], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const L = (window as any).L;
    if (!mapRef.current || !L) return;
    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();

    // Custom icon generator
    const createIcon = (isActive: boolean) => {
      const color = isActive ? '#dc2626' : '#16a34a';
      return L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });
    };

    locations.forEach(loc => {
      const isActive = loc.id === selectedLocationId;
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createIcon(isActive)
      })
      .addTo(map)
      .on('click', () => onSelectLocation(loc.id));
      
      marker.bindTooltip(loc.name, {
        permanent: false,
        direction: 'top',
        className: 'font-semibold text-xs rounded-lg border-none shadow-md px-3 py-1'
      });

      markersRef.current.set(loc.id, marker);
    });

    if (selectedLocationId) {
      const selected = locations.find(l => l.id === selectedLocationId);
      if (selected) {
        map.flyTo([selected.lat, selected.lng], 15, { duration: 1.5 });
      }
    }
  }, [locations, selectedLocationId]);

  return (
    <div id={mapContainerId} className="w-full h-full" />
  );
};

export default MapComponent;
