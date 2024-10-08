import React from 'react'

function Testimonials() {
    return (
        <section className="flex flex-col gap-20 w-11/12 lg:w-5/6 xl:w-3/4 items-center">
            <h1 className="main-page-header text-black">What is people saying</h1>
            <div className="grid grid-cols-3 grid-rows-4 w-full">

                <div className="w-72 h-96 bg-opacity-25 bg-brand rounded-md flex flex-col">
                    <div className="rounded-full bg-white h-20 w-20 self-center mt-10"></div>
                </div>

                <div className="w-72 h-1/2 bg-opacity-25 bg-brand row-span-2 self-center rounded-md"></div>
                <div className="w-72 h-96 bg-opacity-25 bg-brand col-start-3 rounded-md"></div>
            </div>
        </section>
    )
}

export default Testimonials
