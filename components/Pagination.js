import Link from 'next/link'
import { PER_PAGE } from '@/config/index'

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE)

  return (
    <>
      {page > 1 && page <= lastPage && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Sebelumnya</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Selanjutnya</a>
        </Link>
      )}
    </>
  )
}
