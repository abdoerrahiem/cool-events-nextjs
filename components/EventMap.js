import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function EventMap({ event }) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  })

  useEffect(() => {
    if (event) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.address.replaceAll(
          ' ',
          '%20'
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          const latitude = data.features[0].center[1]
          const longitude = data.features[0].center[0]

          setLat(latitude)
          setLng(longitude)
          setViewport({
            ...viewport,
            latitude,
            longitude,
          })
          setLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [event])

  if (loading) return false

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={event.id} latitude={lat} longitude={lng}>
        <Image src='/images/pin.svg' width={30} height={30} />
      </Marker>
    </ReactMapGl>
  )
}
