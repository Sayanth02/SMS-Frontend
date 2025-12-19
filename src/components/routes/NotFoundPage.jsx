import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-light text-dark text-center'>
      <div className='bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-red-500'>
          404 - Page Not Found
        </h1>
        <p className='mt-4 text-lg'>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
