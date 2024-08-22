"use client"

import { useState } from "react";

import Image from 'next/image';
import { professionalWithColors } from "@/app/lib/definitions";
import { useMediaQuery } from "react-responsive";

export default function ProfessionalCard({ professional }: { professional: professionalWithColors }) {

    const [ topHover, setTopHover] = useState(false)
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
            <div className="relative flex items-center justify-center h-80 w-80 lg:h-96 lg:w-96 rounded-full text-white text-center text-xl list-none transition 300ms ease-in-out" 
            style={{ backgroundColor:  topHover || bottomHover ? professional.cardColor : "black", border: `5px solid ${professional.color}` }}
            >
                <div className="h-5/6 w-5/6 rounded-full overflow-hidden">
                    <div className="flex flex-col items-center justify-center h-1/2 rounded-t-full lg:hover:h-full transition-all 300ms ease-out" 
                        onMouseEnter={isDesktop ? handleMouseEnterTop : undefined} 
                        onMouseLeave={isDesktop ? handleMouseLeaveTop : undefined}
                    >
                        <Image src={imgSrc || "/avatar.svg"} alt="Avatar" onError={handleImgError} width={400} height={400} className={`${ bottomHover ? "h-0" : "h-full"} ${imgSrc == "/avatar.svg" || !imgSrc ? "object-contain" : "object-cover"} w-full transition-all 300ms ease-out`} />
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
                                            <li className="flex items-start justify-center max-h-2/3 my-5 text-md overflow-y-scroll scroll-container">
                                                {professional.description}
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li><span className="font-bold p-1" style={{ background: professional.color }}>{professional.specialty}</span></li>
                                            <li className="text-md">{professional.experience} years of exp.</li>
                                        </>
                                    )
                            }
                            </div>
                            </div>
                </div>
            </div>
    )
}
