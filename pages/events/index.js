import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Acara</h1>
      {events.length === 0 && <h3>Belum ada acara untuk saat ini</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventRes.json()

  return {
    props: {
      events,
      page: +page,
      total,
    },
  }
}
