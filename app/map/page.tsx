'use client'
import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import './map.css'
import Plane from './plane'
import { createRoot } from 'react-dom/client'
import { useDarkMode } from '../utils/hooks'
import axios from 'axios'
import { countryCodeEmoji } from 'country-code-emoji'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''
const airLabsAPIKey = process.env.REACT_APP_AIR_LABS_API_KEY
const airLabsBaseURL = `https://airlabs.co/api/v9`
const flightsURL = `${airLabsBaseURL}/flights?api_key=${airLabsAPIKey}`
const airportURL = `${airLabsBaseURL}/airports?api_key=${airLabsAPIKey}`

type StatsType = {
  arrival: { count: number; color: string }
  departure: { count: number; color: string }
}

type FlightsReponseType = {
  flight_iata: string
  lng: number
  lat: number
  dir: number
  flag: string
  speed: number
  dep_iata: string
  arr_iata: string
  updated: number
}

type FlightAdditionalType = {
  fill: string
  type: 'arriving' | 'departing'
}

type AirportType = {
  lng: number
  lat: number
  name: string
}

type Point = {
  lng: number
  lat: number
}

const Marker = ({ fill }: { fill: string }) => {
  return (
    <div style={{ width: '20px', height: '20px' }}>
      <Plane fill={fill} />
    </div>
  )
}

export default function Map() {
  const [airport, setAirport] = useState<AirportType>({
    lng: -122.380227,
    lat: 37.617678,
    name: 'San Franciscto International Airport',
  })
  const [airportIata, setAirportIata] = useState('SFO')
  const [zoom] = useState(5)
  const darkMode = useDarkMode()
  const mapContainerRef = useRef<any>(null)
  const map = useRef<mapboxgl.Map | any>(null)
  const markerRef = useRef<any>(null)
  const [stats, setStats] = useState<StatsType | null>(null)
  const [allMarkers, setAllMarkers] = useState<mapboxgl.Marker[] | null[]>([])

  const parseFlightResponse = ({
    flight_iata,
    lng,
    lat,
    dir,
    fill,
    flag,
    speed,
    dep_iata,
    arr_iata,
    updated,
    type,
  }: FlightsReponseType & FlightAdditionalType) => {
    markerRef.current = document.createElement('div')
    const root = createRoot(markerRef.current)
    const updatedDate = new Date(updated * 1000)
    const popupDescription = `
    <div class="flight-popup">
      <h3 class="title" style="color: ${fill}">${type}</h3>
      <h3>
        ${flight_iata ?? ''}<span class="flag-icon">${
      flag && countryCodeEmoji(flag === 'UK' ? 'GB' : flag)
    }</span>
      </h3>
      <p>speed: ${speed}kph</p>
      <p>${dep_iata} → ${arr_iata}</p>
      <p class="date">${updatedDate.toLocaleString()}</p>
    </div>
    `
    root.render(<Marker fill={fill} />)
    const popup = new mapboxgl.Popup({ closeButton: false }).setHTML(
      popupDescription
    )

    const marker = new mapboxgl.Marker(markerRef.current)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .setRotation(dir - 45) // accomodate for svg icon rotation
      .addTo(map.current)

    marker.getElement().addEventListener('click', () => {
      const airportsFetch = axios.get(
        `${airportURL}&iata_code=${dep_iata},${arr_iata}`
      )
      airportsFetch.then(({ data }) => {
        const start = data.response[0]
        const end = data.response[1]
        showLine({
          startPoint: { lng: start.lng, lat: start.lat },
          midPoint: { lng, lat },
          endPoint: { lng: end.lng, lat: end.lat },
        })
      })
    })

    // @ts-ignore
    setAllMarkers((allMarkers) => [...allMarkers, marker])
  }

  const removeLine = () => {
if (map.current?.getLayer('route')) {
      map.current.removeLayer('route')
    }
    if (map.current?.getSource('route')) {
      map.current.removeSource('route')
    }
  }

  const showLine = ({
    startPoint,
    midPoint,
    endPoint,
  }: {
    startPoint: Point
    midPoint: Point
    endPoint: Point
  }) => {
    removeLine()
    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [startPoint.lng, startPoint.lat],
            [midPoint.lng, midPoint.lat],
            [endPoint.lng, endPoint.lat],
          ],
        },
      },
    })
    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#2196f3',
        'line-width': 2,
      },
    })
  }

  useEffect(() => {
    removeLine()
    const airportsFetch = axios.get(`${airportURL}&iata_code=${airportIata}`)
    const arrivalFlightsFetch = axios.get(
      `${flightsURL}&arr_iata=${airportIata}`
    )
    const departureFlightsFetch = axios.get(
      `${flightsURL}&dep_iata=${airportIata}`
    )
    Promise.all([
      airportsFetch,
      arrivalFlightsFetch,
      departureFlightsFetch,
    ]).then(([airport, arrivals, departures]) => {
      const arrivalColor = '#66bb6a'
      const departureColor = '#ef5350'
      setStats({
        arrival: {
          count: arrivals.data.response.length,
          color: arrivalColor,
        },
        departure: {
          count: departures.data.response.length,
          color: departureColor,
        },
      })
      if (allMarkers.length > 0) {
        allMarkers.forEach((marker) => {
          marker?.remove()
        })
        setAllMarkers([])
      }
      setAirport({
        lng: airport.data.response[0].lng,
        lat: airport.data.response[0].lat,
        name: airport.data.response[0].name,
      })
      arrivals.data.response.forEach((args: FlightsReponseType) =>
        parseFlightResponse({ ...args, fill: arrivalColor, type: 'arriving' })
      )
      departures.data.response.forEach((args: FlightsReponseType) =>
        parseFlightResponse({
          ...args,
          fill: departureColor,
          type: 'departing',
        })
      )
    })
  }, [airportIata])

  useEffect(() => {
    map?.current?.flyTo({
      center: [airport.lng, airport.lat],
      zoom,
      duration: 2000,
      essential: true,
    })
  }, [airport.lng, airport.lat])

  useEffect(() => {
    map.current?.setStyle(
      `mapbox://styles/mapbox/${darkMode ? 'dark' : 'light'}-v10`
    )

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {})
    }
  }, [darkMode])

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${darkMode ? 'dark' : 'light'}-v10`,
      center: [airport.lng, airport.lat],
      zoom: zoom,
      projection: 'globe' as any as mapboxgl.Projection,
    })
    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false,
      }),
      'top-right'
    )

    map.current.on('load', () => {})
  }, [])

  const memoStyle = useMemo(
    () => ({
      backgroundColor: darkMode ? '#000' : '#b9defe',
      height: '100vh',
      width: '100vw',
    }),
    [darkMode]
  )

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      const formElements = form.elements as typeof form.elements & {
        filter: { value: string }
      }
      setAirportIata(formElements.filter.value)
    },
    []
  )

  return (
    <main style={memoStyle}>
      <div className="map-container" ref={mapContainerRef} />
      <form action="" className="filter-ctrl" onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: 10 }}>{airport.name}</h3>
        <input
          id="filter-input"
          type="text"
          name="filter"
          placeholder="Filter by name"
          defaultValue={airportIata}
        />
        {stats && (
          <div className="stats-container">
            <div style={{ color: stats?.arrival.color }}>
              Arrivals: <>{stats?.arrival.count}</>
            </div>
            <div style={{ color: stats?.departure.color }}>
              Departures: <>{stats?.departure.count}</>
            </div>
            <div>
              Total: <>{stats?.arrival.count + stats?.departure.count}</>
            </div>
          </div>
        )}
      </form>
    </main>
  )
}
