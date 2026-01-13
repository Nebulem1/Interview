import Agent from '@/components/Agent'
import React from 'react'

const Page = () => {
  return (
    <> 
    <div>Interview Generation</div>
    <Agent userName="you" userId="user1" type="generate" />
    </>
  )
}

export default Page