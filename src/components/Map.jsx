import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// NYC center coordinates
const NYC_CENTER = [40.7128, -74.0060];
const DEFAULT_ZOOM = 11;

// Create custom pizza emoji icon
const createPizzaIcon = () => {
  return L.divIcon({
    html: '<span class="pizza-marker">🍕</span>',
    className: 'pizza-marker-container',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

export function Map({ places, onSelectPlace, selectedPlaceId }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: NYC_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Add zoom control to bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add/update markers when places change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = {};

    // Add new markers
    places.forEach(place => {
      if (!place.active) return;

      const marker = L.marker([place.latitude, place.longitude], {
        icon: createPizzaIcon(),
        title: place.name
      });

      marker.on('click', () => {
        onSelectPlace(place);
      });

      // Create popup content
      const popupContent = `
        <div class="marker-popup">
          <strong>${place.name}</strong>
          <span>${place.neighborhood}</span>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: false,
        className: 'pizza-popup'
      });

      marker.on('mouseover', function() {
        this.openPopup();
      });

      marker.on('mouseout', function() {
        this.closePopup();
      });

      marker.addTo(map);
      markersRef.current[place.place_id] = marker;
    });
  }, [places, onSelectPlace]);

  // Handle selected place change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPlaceId) return;

    const marker = markersRef.current[selectedPlaceId];
    if (marker) {
      const place = places.find(p => p.place_id === selectedPlaceId);
      if (place) {
        map.flyTo([place.latitude, place.longitude], 15, {
          duration: 0.5
        });
      }
    }
  }, [selectedPlaceId, places]);

  return (
    <div className="map-container" ref={mapRef} role="application" aria-label="NYC Pizza Map" />
  );
}

export default Map;
