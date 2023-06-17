import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''

export default function Map() {
  return <div>Mapbox test</div>
}
