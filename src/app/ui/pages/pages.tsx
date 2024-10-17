import React from "react";
import search from "../../../../public/search.svg"
import filter from "../../../../public/filter.svg"
import Image from "next/image";

export function MainPage({ children, header, text }: Readonly<{ children: React.ReactNode, header?: string, text?: string }>) {
    return (
        <section className="flex flex-col gap-28 items-center pt-28 w-11/12 lg:w-5/6 xl:w-2/3 min-h-screen">
            <div className="flex flex-col gap-3 items-center w-3/4">
                <h1 className={`main-page-header ${header == "Synergia" ? "font-bold" : ""}`}>
                    {header && header}
                </h1>
                {
                    text ?
                        (<p>{text}</p>) :
                        ""
                }
            </div>
            <div className="w-full flex flex-col gap-10 items-center">
                {children}
            </div>
        </section>
    )
}

export function LookForPage({ children, header }: Readonly<{ children: React.ReactNode, header: string }>) {
    return (
        <section className="flex flex-col gap-28 items-center pt-36 w-11/12 lg:w-5/6 xl:w-2/3 min-h-screen">
            <h1 className="alternative-main-page-header">{header}</h1>


            <form className="w-full flex flex-col gap-5 justify-center items-start">


                <div className="w-full h-12 flex rounded-md border border-gray-200 ">

                    <div className="h-full flex items-center justify-center p-3">
                        <Image src={search} alt="Search icon" className="h-full" />
                    </div>

                    <input className="border-none flex-grow h-full p-3" placeholder="Search by...">
                    </input>

                </div>

                <button type="button" className="h-8 flex items-center justify-center p-3 border-gray-200 border rounded-full text-gray-400 text-xs">
                    Filter by
                    {/* <Image src={filter} alt="Filter icon" className="h-full" /> */}
                </button>

                <div className="w-80 h-44 overflow-y-auto scroll-container rounded-md border border-gray-200 flex flex-col items-start p-3">
                    <li className="border-b pt-3 border-gray-100 w-full text-left">Experience</li>
                    <li className="border-b pt-3 border-gray-100 w-full text-left">Specialty</li>
                    <li className="border-b pt-3 border-gray-100 w-full text-left">Availability</li>
                    <li className="border-b pt-3 border-gray-100 w-full text-left">Salary</li>
                    <li className="border-b pt-3 border-gray-100 w-full text-left"></li>
                </div>
            </form>


            <div className="flex-1 w-full items-center justify-center justify-items-center lg:gap-14" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(384px, 1fr))", gridAutoRows: "384px" }}>
                {children}
            </div>
        </section>
    )
}