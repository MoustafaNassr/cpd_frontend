import React, { Suspense } from 'react'
import Services from "./Shell"


export default async function  Dashboard  () {

  return (
    <>
        <Suspense fallback={<div>Loading dashboard...</div>}>

     <Services />
        </Suspense>

    </>
  )
}

