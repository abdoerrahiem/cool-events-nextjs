import QueryString from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ events }) {
  const { query } = useRouter()

  return (
    <Layout title='Hasil Pencarian'>
      <Link href='/events'>Kembali</Link>
      <h1>Hasil Pencarian : {query.term}</h1>
      {events.length === 0 && <h3>Belum ada acara untuk saat ini</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = QueryString.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  })
  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()

  return {
    props: {
      events,
    },
  }
}
