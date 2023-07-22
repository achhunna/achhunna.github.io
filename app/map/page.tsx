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
import { airportURL, flightsURL } from './constants'
import { Point } from '@turf/turf'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''

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

const Marker = ({ fill }: { fill: string }) => {
  return (
    <div style={{ width: '20px', height: '20px' }}>
      <Plane fill={fill} />
    </div>
  )
}

const doesCross180Meridian = (start: Point, end: Point) => {
  const startLng = start.coordinates[0]
  const endLng = end.coordinates[0]
  return (
    (startLng < 0 && endLng > 0 && startLng < -90 && endLng > 90) ||
    (startLng > 0 && endLng < 0 && startLng > 90 && endLng < -90)
  )
}

const parseLng = (start: Point, end: Point) => {
  if (doesCross180Meridian(start, end)) {
    let endLng = end.coordinates[0]
    if (end.coordinates[0] - start.coordinates[0] >= 180) {
      // when startLng is -ve & endLng is +ve
      endLng -= 360
    } else if (end.coordinates[0] - start.coordinates[0] < 180) {
      endLng += 360
    }
    return endLng
  }
  return end.coordinates[0]
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
  const [allFlightMarkers, setAllFlightMarkers] = useState<
    mapboxgl.Marker[] | null[]
  >([])

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
          startPoint: { type: 'Point', coordinates: [start.lng, start.lat] },
          midPoint: { type: 'Point', coordinates: [lng, lat] },
          endPoint: { type: 'Point', coordinates: [end.lng, end.lat] },
        })
      })
    })

    // @ts-ignore
    setAllFlightMarkers((allFlightMarkers) => [...allFlightMarkers, marker])
  }

  const handleRemoveLines = () => {
    console.log({ map: map.current })
    if (map.current?.getLayer('route1')) {
      map.current.removeLayer('route1')
    }
    if (map.current?.getSource('route1')) {
      map.current.removeSource('route1')
    }
    if (map.current?.getLayer('route2')) {
      map.current.removeLayer('route2')
    }
    if (map.current?.getSource('route2')) {
      map.current.removeSource('route2')
    }
    const allAirportMarkers = map.current?.allAirportMarkers
    if (allAirportMarkers?.length > 0) {
      allAirportMarkers.forEach((marker: mapboxgl.Marker, i: number) => {
        if (i !== 0) {
          marker?.remove()
        }
      })
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
    handleRemoveLines()
    const midPointLng = parseLng(startPoint, midPoint)
    const endPointLng = parseLng(midPoint, endPoint)
    map.current.addSource('route1', {
      type: 'geojson', // https://geojson.org
      data: {
        type: 'Feature',
        properties: {
          name: 'Airplane route',
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [startPoint.coordinates[0], startPoint.coordinates[1]],
            [midPointLng, midPoint.coordinates[1]],
          ],
        },
      },
    })
    map.current.addSource('route2', {
      type: 'geojson', // https://geojson.org
      data: {
        type: 'Feature',
        properties: {
          name: 'Airplane route',
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [midPoint.coordinates[0], midPoint.coordinates[1]],
            [endPointLng, endPoint.coordinates[1]],
          ],
        },
      },
    })
    map.current.addLayer({
      id: 'route1',
      type: 'line',
      source: 'route1',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#2196f3',
        'line-width': 1,
      },
    })
    map.current.addLayer({
      id: 'route2',
      type: 'line',
      source: 'route2',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#2196f3',
        'line-width': 1,
      },
    })

    const marker1 = new mapboxgl.Marker()
      .setLngLat([startPoint.coordinates[0], startPoint.coordinates[1]])
      .addTo(map.current)
    const marker2 = new mapboxgl.Marker()
      .setLngLat([endPoint.coordinates[0], endPoint.coordinates[1]])
      .addTo(map.current)
    const newAllAirportMarkers = map.current.allAirportMarkers
      ? [...map.current.allAirportMarkers]
      : []
    newAllAirportMarkers.push(marker1, marker2)
    map.current.allAirportMarkers = newAllAirportMarkers
  }

  useEffect(() => {
    handleRemoveLines()
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
      if (allFlightMarkers.length > 0) {
        allFlightMarkers.forEach((marker) => {
          marker?.remove()
        })
        setAllFlightMarkers([])
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
    if (map?.current) {
      const marker = new mapboxgl.Marker()
        .setLngLat([airport.lng, airport.lat])
        .addTo(map?.current)

      const newAllAirportMarkers = map.current.allAirportMarkers
        ? [...map.current.allAirportMarkers]
        : []
      const oldMarker = newAllAirportMarkers[0]
      if (oldMarker) {
        oldMarker.remove()
      }
      newAllAirportMarkers[0] = marker
      map.current.allAirportMarkers = newAllAirportMarkers
      handleRemoveLines()
    }
  }, [airport.lng, airport.lat, map.current])

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
    if (map.current) {
      return
    }
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

    map.current.on('load', () => {
      console.log('map loaded')
    })
    map.current.on('click', handleRemoveLines)

    return () => map.current.remove()
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
