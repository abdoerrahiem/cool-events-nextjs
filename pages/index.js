import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Acara Terbaru</h1>
      {events.length === 0 && <h3>Belum ada acara untuk saat ini</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>Lihat Semua Acara</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: {
      events,
    },
    revalidate: 1,
  }
}
