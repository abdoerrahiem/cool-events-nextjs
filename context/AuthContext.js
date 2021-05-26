import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { API_URL, NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const { push } = useRouter()

  useEffect(() => checkLoggedInUser(), [])

  const register = async ({ username, email, password }) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      setError(null)
      return
    }

    setUser(data.user)
    push('/account/dashboard')
  }

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      setError(null)
      return
    }

    setUser(data.user)
    push('/account/dashboard')
  }

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })

    const data = await res.json()

    if (res.ok) {
      setUser(null)
      push('/')
      toast.success(data.message)
    }
  }

  const checkLoggedInUser = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if (!res.ok) return setUser(null)

    setUser(data.user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        checkLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
