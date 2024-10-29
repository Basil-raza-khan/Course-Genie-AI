import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow-md h-20">
    <div className="flex-shrink-0 ml-0 mr-auto md:ml-2 ">
      <Image src={'/CourseGenie A.svg'} width={200} height={90} />
    </div>
    <Button >Get Started</Button> 
  </div>
  
  
  )
}

export default Header