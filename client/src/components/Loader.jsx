import React from 'react'

function Loader() {
  return (
    <div className='flex flex-col gap-14 justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-18 w-18 border-4 border-t-white border-gray-700'>
            
        </div>
        <p className='text-3xl p-2 px-5 m-2 bg-primary/12 max-w-3xl rounded border border-primary/10 text-gray-900'>Loading...</p>
    </div>
  )
}

export default Loader