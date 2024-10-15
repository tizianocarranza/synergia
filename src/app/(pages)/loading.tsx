import React from 'react'
import Loader from '../ui/loader/loader';

function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Loader />
    </div>
  )
}

export default Loading;