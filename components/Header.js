import { useContext } from 'react'
import Link from 'next/link'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Search from './Search'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Cool Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Acara</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href='/events/add'>
                  <a>Tambah Acara</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  className='btn-secondary btn-icon'
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Keluar
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href='/account/login'>
                <a className='btn-secondary btn-icon'>
                  <FaSignInAlt /> Masuk
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
