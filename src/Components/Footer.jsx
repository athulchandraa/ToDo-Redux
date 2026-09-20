import React from 'react'

function Footer() {
  return (
    <div className='p-2 fixed w-full bottom-0 left-0 z-50'>
        <div className='shadow flex items-center gap-5 p-5 rounded-lg bg-[url("/FooterBg.jpg")]'>
            <img style={{width:'40px'}} src="/rocket.png" alt="" />
            <p className='text-blue-900 font-semibold'>Small steps today,big results tomorrow.</p>
        </div>
    </div>
  )
}

export default Footer