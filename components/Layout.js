import Head from 'next/head'
import {useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'
import styles from '@/styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
  const {pathname} = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'Cool Events | Temukan Acara Menarik',
  description: 'Temukan acara menarik dan terbaru disini',
  keywords: 'events, acara, music, audio',
}
