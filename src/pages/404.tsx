import Link from 'next/link'
import React from 'react'

export default function CustomError() {
  return (
    <div className="text-center px-6 lg:px-0 bg-gray-100 h-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl lg:text-7xl font-bold text-primary font-kanit">
        404
      </h1>
      <p className="font-kanit text-3xl lg:text-3xl my-4 font-medium">
        Page doesn&#39;t exist... the sadness.😢
      </p>
      <div  className="font-medium text-xl">
        Return to  <Link href="/" className="text-primary">Home </Link>Page

    </div>
    </div>
  )
}
