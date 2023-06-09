import React from 'react'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <nav className='shadow-xl flex justify-between bg-white text-white px-10 py-5 sticky top-0'>
        <div className='text-2xl text-black font-bold'>
          <Link href='/'>  <span className='text-blue-600'>Fin.</span>Tracker </Link>
        </div>

        <div className='flex justify-centers items-centers'>
          {
            (
              <>
                <Link className='bg-blue-600 px-6 py-3 rounded-lg ml-2' href="/login">Login</Link>
                <Link className='bg-slate-100 text-blue-600 font-bold border-2 border-blue-600 px-6 py-3 rounded-lg ml-2' href="/login">Sign Up</Link>
              </>
            )
          }
        </div>
      </nav>
    </>
  )
}
