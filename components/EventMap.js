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
        `http://api.positionstack.com/v1/forward?access_key=${
          process.env.NEXT_PUBLIC_POSITION_STACK_API
        }&query=${event.address.replaceAll(' ', '%20')}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLat(data.data[0].latitude)
          setLng(data.data[0].longitude)
          setViewport({
            ...viewport,
            latitude: data.data[0].latitude,
            longitude: data.data[0].longitude,
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
