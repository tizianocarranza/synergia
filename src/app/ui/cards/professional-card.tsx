"use client"

import clsx from "clsx";
import { useState } from "react";

import Image from 'next/image';
import { ProfessionalWithColors } from "@/app/lib/types/general";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

export default function ProfessionalCard({ professional }: { professional: ProfessionalWithColors }) {

    const [topHover, setTopHover] = useState(false)
    const [bottomHover, setBottomHover] = useState(false);

    const [imgSrc, setImgSrc] = useState(professional.image);

    const isDesktop = useMediaQuery({ minWidth: 1024 })

    const handleMouseEnterTop = () => {
        setTopHover(true)
    }
    const handleMouseLeaveTop = () => {
        setTopHover(false)
    }
    const handleMouseEnterBottom = () => {
        setBottomHover(true)
    }
    const handleMouseLeaveBottom = () => {
        setBottomHover(false)
    }


    const handleImgError = () => {
        setImgSrc("/avatar.svg");
    }


    return (
        <Link href={`/${professional._id}`} >
            <div className={clsx({
                ["relative flex items-center justify-center h-80 w-80 lg:h-96 lg:w-96 rounded-full text-black text-center text-xl shadow-md shadow-brand list-none transition-all 300ms ease-in-out hover:shadow-lg hover:shadow-accent"]: true,
                ["opacity-40 shadow-black hover:shadow-black hover:shadow-md"]: (professional.employmentStatus === "employed")
            })}>
                <div className="h-5/6 w-5/6 rounded-full overflow-hidden">
                    <div className="flex flex-col items-center justify-center h-1/2 rounded-t-full lg:hover:h-full transition-all 300ms ease-out"
                        onMouseEnter={isDesktop ? handleMouseEnterTop : undefined}
                        onMouseLeave={isDesktop ? handleMouseLeaveTop : undefined}
                    >
                        <Image src={imgSrc || "/avatar.svg"} alt="Avatar" onError={handleImgError} width={400} height={400} className={`${bottomHover ? "h-0" : "h-full"} ${imgSrc == "/avatar.svg" || !imgSrc ? "object-contain" : "object-cover"} w-full transition-all 300ms ease-out`} />
                    </div>
                    <div className="flex justify-center items-center h-1/2 rounded-b-full lg:hover:h-full lg:hover:-translate-y-1/2 transition-all 300ms ease-out"
                        onMouseEnter={isDesktop ? handleMouseEnterBottom : undefined}
                        onMouseLeave={isDesktop ? handleMouseLeaveBottom : undefined}
                    >
                        <div className="flex flex-col justify-center items-center h-full w-10/12 gap-3">
                            <li className="font-bold">{professional.name}</li>
                            {
                                bottomHover ?
                                    (
                                        <>
                                            <li className="flex items-start justify-center max-h-2/3 my-5 text-md scroll-y-container">
                                                {professional.description}
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li><span className="font-bold p-1 text-md" style={{ color: professional.color }}>{professional.specialty}</span></li>
                                            <li className="text-md">{professional.experience} years of exp.</li>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div> 
        </Link>
    )
}