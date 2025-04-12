"use client"
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('@/app/components/Invoice'), { ssr: false })
 
export default function Page() {
  return (
    <div>
      <NoSSR />
    </div>
  )
}