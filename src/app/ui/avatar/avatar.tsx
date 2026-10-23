"use client"

import { useState } from "react"
import clsx from "clsx"
import { getInitials } from "@/app/lib/initials"

export function Avatar({ name, image, size = 48, className }: Readonly<{ name: string, image?: string, size?: number, className?: string }>) {
    const [failed, setFailed] = useState(false)
    const showImage = Boolean(image) && !failed

    return (
        <div
            className={clsx("flex shrink-0 items-center justify-center overflow-hidden border-2 border-ink bg-paper", className)}
            style={{ width: size, height: size }}
        >
            {showImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={name} className="h-full w-full object-cover" onError={() => setFailed(true)} />
            ) : (
                <span className="font-black leading-none" style={{ fontSize: size * 0.38 }}>
                    {getInitials(name)}
                </span>
            )}
        </div>
    )
}
