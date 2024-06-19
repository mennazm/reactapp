import React from 'react'
import { useRouteError } from 'react-router-dom'

export function ErrorComp() {
   let error = useRouteError();
  return (
  
    <div  className='alert alert-danger container my-4'>
        <h2>Error Occurs </h2>
        <p>{error.message}</p>
    </div>
  )
}
