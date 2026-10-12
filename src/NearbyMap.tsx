
import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export type MapListing = {
  id: string
  title: string
  category: 'Deals' | 'Events' | 'Places'
  subtitle: string
  location: string
  distance: string
  time: string
  price?: string
  image: string
  position: [number, number]
}

type NearbyMapProps = {
  listings: MapListing[]
  selectedListing?: MapListing | null
  onSelect?: (listing: MapListing) => void
}

const defaultCenter: [number, number] = [16.5062, 80.648]

const categoryIcons: Record<MapListing['category'], L.DivIcon> = {
  Deals: L.divIcon({
    className: 'nearby-map-marker',
    html: '<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#b88383;border:3px solid #fff;box-shadow:0 2px 8px #0002"></div>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),

  Events: L.divIcon({
    className: 'nearby-map-marker',
    html: '<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#9a9c82;border:3px solid #fff;box-shadow:0 2px 8px #0002"></div>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),

  Places: L.divIcon({
    className: 'nearby-map-marker',
    html: '<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#c6a477;border:3px solid #fff;box-shadow:0 2px 8px #0002"></div>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
}

function MapCamera({
  selectedListing,
}: {
  selectedListing?: MapListing | null
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedListing) {
      map.flyTo(selectedListing.position, 15, {
        duration: 0.8,
      })
    }
  }, [map, selectedListing])

  return null
}

export default function NearbyMap({
  listings,
  selectedListing,
  onSelect,
}: NearbyMapProps) {
  return (
    <section className="map-section" id="map">
      <div className="map-heading">
        <div>
          <p className="eyebrow">EXPLORE YOUR SURROUNDINGS</p>
          <h2>Close to you</h2>
          <p className="section-description">
            Discover little places and experiences nearby.
          </p>
        </div>

        <span className="map-count">
          {listings.length} {listings.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      <div className="nearby-map-container">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          scrollWheelZoom
          className="nearby-leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapCamera selectedListing={selectedListing} />

          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={listing.position}
              icon={categoryIcons[listing.category]}
              eventHandlers={{
                click: () => onSelect?.(listing),
              }}
            >
              <Popup>
                <div className="map-popup">
                  <strong>{listing.title}</strong>
                  <p>{listing.subtitle}</p>
                  <span>{listing.distance} away</span>
                  {listing.price && <p>{listing.price}</p>}
                  <button
                    type="button"
                    onClick={() => onSelect?.(listing)}
                  >
                    View details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <p className="map-disclaimer">
        Map data © OpenStreetMap contributors. Sample listings are for
        demonstration purposes.
      </p>
    </section>
  )
}
