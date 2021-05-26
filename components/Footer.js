import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Cool Events {year}</p>
      <p>
        <Link href='/about'>Tentang Cool Events</Link>
      </p>
    </footer>
  )
}
