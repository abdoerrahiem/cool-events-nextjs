import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/context/AuthContext'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
