import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { toast } from 'react-toastify'
import { getCookies } from '@/helpers/index'

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const { push } = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasEmptyFields = Object.values(values).some((e) => e === '')
    if (hasEmptyFields) return toast.error('Silahkan isi semua field!')

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401)
        return toast.error('Token tidak valid!')

      return toast.error('Terjadi kesalahan!')
    }

    const event = await res.json()
    push(`/events/${event.slug}`)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title='Tambah Acara Baru'>
      <Link href='/events'>Kembali</Link>
      <h1>Tambah Acara Baru</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Nama Acara</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Tempat</label>
            <input
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Alamat</label>
            <input
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Tanggal</label>
            <input
              type='date'
              id='date'
              name='date'
              value={values.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Waktu</label>
            <input
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Deskripsi Acara</label>
          <textarea
            name='description'
            id='description'
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type='submit' value='Simpan Acara' className='btn' />
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = getCookies(req)

  return {
    props: {
      token,
    },
  }
}
