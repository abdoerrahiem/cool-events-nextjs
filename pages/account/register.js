import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Layout from '@/components/Layout'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.css'

export default function register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { register, error } = useContext(AuthContext)

  useEffect(() => error && toast.error(error))

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordConfirm)
      return toast.error('Password tidak cocok!')

    register({ username, email, password })
  }

  return (
    <Layout title='Daftar Akun'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Daftar Akun
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor='passwordConfirm'>Konfirmasi Password</label>
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Daftar' className='btn' />
        </form>
        <p>
          Sudah punya akun? <Link href='/account/login'>Masuk</Link>
        </p>
      </div>
    </Layout>
  )
}
