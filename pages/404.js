import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

export default function NotFoundPage() {
  return (
    <Layout title='Halaman Tidak Ditemukan'>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Halaman yang anda cari tidak ditemukan</h4>
        <Link href='/'>Kembali Ke Halaman Utama</Link>
      </div>
    </Layout>
  )
}
