import React from 'react'
import Loader from '../ui/loader/loader';

function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader />
    </div>
  )
}

export default Loading;