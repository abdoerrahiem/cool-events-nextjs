import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Layout from '@/components/Layout'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.css'

export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useContext(AuthContext)

  useEffect(() => error && toast.error(error))

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title='Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Masuk Akun
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Alamat Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Masuk' className='btn' />
        </form>
        <p>
          Belum punya akun? <Link href='/account/register'>Daftar</Link>
        </p>
      </div>
    </Layout>
  )
}
