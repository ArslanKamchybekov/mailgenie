import * as React from 'react'
import Link from 'next/link'

function NavBar() {
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-2 font-bold border-b border-solid border-zinc-200 leading-[154.5%] max-md:flex-wrap max-md:px-5">
      <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
        <p className='text-2xl text-gravel'>MailGenie</p>
      </div>
      <Link
        href="/dashboard"
        className="bg-orange px-4 py-2 rounded-sm text-white"
      >
        Get Started
      </Link>
    </div>
  )
}

export default NavBar