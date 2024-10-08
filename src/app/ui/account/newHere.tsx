import React from 'react'
"use client"
import { useState } from 'react';
import { PrimaryButton, LinkButton } from '../buttons/buttons';

function NewHere() {
    const [userType, setUserType] = useState("professional");

    const handleChangeUserType = () => {
        if (userType === "professional") {
            setUserType("organization");
        }
        else {
            setUserType("professional");
        }
    }

    return (
        <div className="w-full flex flex-col gap-10">

            <div className="flex flex-col w-full justify-center items-center gap-3">

                <div className="h-16 w-full flex gap-10 justify-center">
                    <h2 className=" text-3xl font-semibold align-text-bottom w-80 self-center">{userType === "professional" ? `I'm a professional` : `I'm a recruiter`}</h2>
                    <PrimaryButton type="button" action={handleChangeUserType}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_15_21)">
                                <path d="M16 3.5L20 7.5L16 11.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 7.5H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 13.5L4 17.5L8 21.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4 17.5H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_15_21">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </PrimaryButton>
                    <div className="w-full h-1/3 flex-1 bg-accent bg-opacity-30 rounded-lg place-self-end"></div>
                </div>

                <div className="relative h-80 w-full flex gap-10 justify-center items-center">
                    <div className="absolute w-3/4 h-3/4 bg-brand bg-opacity-30 rounded-lg top-5 left-5"></div>
                    <div className="absolute w-3/4 h-3/4 bg-brand bg-opacity-30 rounded-lg bottom-5 right-5">
                    </div>
                    <div className="w-1/2 h-1/2 z-10 px-1 flex items-end justify-end">
                        <p className="text-xl w-full font-semibold text-white text-right">{userType === "professional" ? `Your next team is waiting for you` : `Talented professionals waiting for you`}</p>
                    </div>
                </div>

                <div className="h-16 w-full flex gap-10 justify-center">
                    <div className="w-full h-1/3 flex-1 bg-accent bg-opacity-30 rounded-lg place-self-start">
                    </div>
                    <LinkButton href={userType === "professional" ? `/sign-up/professional` : `/sign-up/organization`}>
                        <p>{userType === "professional" ? `Create your professional account` : `Create your organization account`}</p>
                    </LinkButton>
                </div>

            </div>
        </div>
    )
}

export default NewHere;
