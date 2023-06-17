'use client'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import styles from './map.module.css'

export default function Map() {
  const [lng, setLng] = useState(-122.380227)
  const [lat, setLat] = useState(37.617678)
  const [zoom, setZoom] = useState(1.8)
  const [mode, setMode] = useState('light')
  const mapContainerRef = useRef<any>(null)
  const map = useRef<mapboxgl.Map | any>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? ''

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${mode}-v10`,
      center: [lng, lat],
      zoom: zoom,
      // @ts-ignore
      projection: 'globe',
    })
    return () => {
      map.current.remove()
    }
  }, [])

  return (
    <main>
      <div className={styles.mapContainer} ref={mapContainerRef} />
    </main>
  )
}
