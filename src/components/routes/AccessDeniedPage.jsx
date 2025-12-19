import React from 'react'

const AccessDeniedPage = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-light text-dark text-center'>
      <div className='bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-red-500'>Access Denied</h1>
        <p className='mt-4 text-lg'>
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  )
}

export default AccessDeniedPage
