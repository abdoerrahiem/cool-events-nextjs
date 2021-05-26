import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import { toast } from 'react-toastify'
import { FaImage } from 'react-icons/fa'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import ImageUpload from '@/components/ImageUpload'
import { getCookies } from '@/helpers/index'

export default function EditEventPage({ event, token }) {
  const {
    id,
    name,
    performers,
    venue,
    address,
    date,
    time,
    description,
    image,
  } = event

  const [values, setValues] = useState({
    name,
    performers,
    venue,
    address,
    date,
    time,
    description,
  })
  const [imagePreview, setImagePreview] = useState(
    image ? image.formats.thumbnail.url : null
  )
  const [showModal, setShowModal] = useState(false)

  const { push } = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasEmptyFields = Object.values(values).some((e) => e === '')
    if (hasEmptyFields) return toast.error('Silahkan isi semua field!')

    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
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

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${event.id}`)
    const data = await res.json()
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title='Edit Acara'>
      <Link href='/events'>Kembali</Link>
      <h1>Edit Acara</h1>
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
              value={moment(values.date).format('yyyy-MM-DD')}
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
        <input type='submit' value='Edit Acara' className='btn' />
      </form>
      <h2>Gambar Acara</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>Gambar tidak tersedia</p>
        </div>
      )}
      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage /> Ubah Gambar
        </button>
      </div>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={event.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = getCookies(req)
  const res = await fetch(`${API_URL}/events/${id}`)
  const event = await res.json()

  return {
    props: {
      event,
      token,
    },
  }
}
