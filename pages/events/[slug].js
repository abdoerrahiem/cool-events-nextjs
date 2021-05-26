import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function EventPage({ event }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString('id')} pada pukul{' '}
          {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image src={event.image.url} width={960} height={600} />
          </div>
        )}
        <h3>Bintang Tamu:</h3>
        <p>{event.performers}</p>
        <h3>Deskripsi:</h3>
        <p>{event.description}</p>
        <h3>Tempat Acara: {event.venue}</h3>
        <p>{event.address}</p>
        <EventMap event={event} />
        <Link href='/events'>
          <a className={styles.back}>{'<'} Kembali</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map((event) => ({
    params: {
      slug: event.slug,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      event: events[0],
    },
  }
}

// export async function getServerSideProps({ query: {slug} }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const event = await res.json()

//   return {
//     props: {
//       event,
//     },
//   }
// }
