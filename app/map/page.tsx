'use client'
import mapboxgl from 'mapbox-gl'
import { createRef, useEffect, useMemo, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import './map.css'
import Plane from './plane'
import { createRoot } from 'react-dom/client'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''
const airLabsAPIKey = process.env.REACT_APP_AIR_LABS_API_KEY
const airLabsBaseURL = `https://airlabs.co/api/v9`

const Marker = ({ fill }: { fill: string }) => {
  return (
    <div style={{ width: '20px', height: '20px' }}>
      <Plane fill={fill} />
    </div>
  )
}

export default function Map() {
  const [lng] = useState(-122.380227)
  const [lat] = useState(37.617678)
  const [zoom] = useState(1.8)
  const [mode, setMode] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  )
  const mapContainerRef = useRef<any>(null)
  const map = useRef<mapboxgl.Map | any>(null)
  const ref = useRef<any>(null)

  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        setMode(e.matches ? 'dark' : 'light')
      })
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${mode}-v10`,
      center: [lng, lat],
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

    fetch(
      `${airLabsBaseURL}/flights?api_key=${airLabsAPIKey}&_view=array&_fields=flight_iata,lng,lat&arr_iata=sfo`
    )
      .then((res) => res.json())
      .then((data) => {
        data.forEach((d: number[]) => {
          ref.current = document.createElement('div')
          const root = createRoot(ref.current)
          root.render(<Marker fill={mode === 'light' ? '#666' : '#fff'} />)
          const popup = new mapboxgl.Popup().setHTML(`<h3>${d[0]}</h3>`)

          new mapboxgl.Marker(ref.current)
            .setLngLat([d[1], d[2]])
            .setPopup(popup)
            .addTo(map.current)
        })
      })

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {})
      map.current.remove()
    }
  }, [mode])

  const memoStyle = useMemo(
    () => ({
      backgroundColor: mode === 'light' ? '#b9defe' : '#000',
      height: '100vh',
      width: '100vw',
    }),
    [mode]
  )

  return (
    <main style={memoStyle}>
      <div className="map-container" ref={mapContainerRef} />
    </main>
  )
}
