import React from 'react'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <nav className='shadow-xl flex justify-between bg-white text-white px-10 py-5 sticky top-0'>
        <div className='text-2xl text-black font-bold'>
          <Link href='/'>  <span className='text-blue-600'>Fin.</span>Tracker </Link>
        </div>
        <span className='text-black'>Welcome To The App</span>
      </nav>
    </>
  )
}
