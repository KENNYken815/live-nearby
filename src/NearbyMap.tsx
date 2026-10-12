
import { useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import type { MapListing } from './App'
import 'leaflet/dist/leaflet.css'

const VIJAYAWADA: [number, number] = [16.5062, 80.6480]

type NearbyMapProps = {
  listings: MapListing[]
  onSelect: (listing: MapListing) => void
}

function makePin(color: string) {
  return L.divIcon({
    className: 'nearby-pin-wrapper',
    html: `<span class="nearby-pin" style="--pin-color:${color}"><span></span></span>`,
    iconSize: [24, 32],
    iconAnchor: [12, 28],
    popupAnchor: [0, -26],
  })
}

const categoryIcons = {
  Deals: makePin('#b88383'),
  Events: makePin('#9a9c82'),
  Places: makePin('#ad9a8c'),
}

const cityIcon = L.divIcon({
  className: 'city-pin-wrapper',
  html: '<span class="city-pin"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

function MapCamera({ position }: { position: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, Math.max(map.getZoom(), 14), {
      duration: 0.8,
    })
  }, [map, position])

  return null
}

export default function NearbyMap({
  listings,
  onSelect,
}: NearbyMapProps) {
  const [mapCentre, setMapCentre] =
    useState<[number, number]>(VIJAYAWADA)
  const [isUserLocation, setIsUserLocation] = useState(false)
  const [locating, setLocating] = useState(false)
  const [message, setMessage] = useState('')

  function locateMe() {
    if (!navigator.geolocation) {
      setMessage('Location is not supported by this browser.')
      return
    }

    setLocating(true)
    setMessage('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextPosition: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ]

        setMapCentre(nextPosition)
        setIsUserLocation(true)
        setLocating(false)
        setMessage('Showing your current location. Listing distances are still demo values.')
      },
      () => {
        setLocating(false)
        setMessage('Location unavailable. Allow location access in your browser and try again.')
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 60000,
      },
    )
  }

  function resetToCity() {
    setMapCentre(VIJAYAWADA)
    setIsUserLocation(false)
    setMessage('')
  }

  return (
    <section className="map-section" id="map">
      <div className="map-heading">
        <div>
          <p className="eyebrow">YOUR LITTLE CORNER OF THE WORLD</p>
          <h2>
            Find your <em>way around.</em>
          </h2>
          <p className="map-intro">
            A map for little discoveries around Vijayawada.
          </p>
        </div>

        <div className="map-actions">
          <button
            type="button"
            className="locate-button"
            onClick={locateMe}
            disabled={locating}
          >
            {locating ? 'FINDING YOU…' : 'USE MY LOCATION ↗'}
          </button>
          {isUserLocation && (
            <button
              type="button"
              className="city-reset"
              onClick={resetToCity}
            >
              BACK TO VIJAYAWADA
            </button>
          )}
        </div>
      </div>

      <div className="map-frame">
        <MapContainer
          center={VIJAYAWADA}
          zoom={14}
          scrollWheelZoom
          className="nearby-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapCamera position={mapCentre} />

          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={listing.position}
              icon={categoryIcons[listing.category]}
              eventHandlers={{
                click: () => onSelect(listing),
              }}
            >
              <Popup>
                <div className="map-popup">
                  <span>{listing.category.toUpperCase()}</span>
                  <strong>{listing.title}</strong>
                  <p>{listing.subtitle}</p>
                  <button
                    type="button"
                    onClick={() => onSelect(listing)}
                  >
                    VIEW DETAILS ↗
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          <Marker position={mapCentre} icon={cityIcon}>
            <Popup>
              {isUserLocation ? 'Your current location' : 'Vijayawada city-centre reference'}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="map-caption">
        <span>MAP STUDY / 01</span>
        <span>
          {isUserLocation ? 'YOUR CURRENT AREA' : 'VIJAYAWADA, ANDHRA PRADESH'}
        </span>
      </div>

      {message && (
        <p className="map-message" role="status">
          {message}
        </p>
      )}

      <p className="map-disclaimer">
        Sample pins are illustrative, not verified venues. Distances and offers are not live.
      </p>
    </section>
  )
}
