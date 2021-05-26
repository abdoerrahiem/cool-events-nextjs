import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getCookies } from '@/helpers/index'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ events, token }) {
  const { reload } = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('Apakah kamu yakin?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      reload()
    }
  }

  return (
    <Layout title='Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>Acaraku</h3>
        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = getCookies(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: {
      events,
      token,
    },
  }
}
