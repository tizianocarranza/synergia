"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { LinkButton, PrimaryButton } from "../buttons/buttons"
import { getLinks, isActive } from "./nav-links"

export default function MobileMenu({ signedIn, signOutAction }: Readonly<{ signedIn: boolean, signOutAction: () => Promise<void> }>) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    // Close when the route changes (adjust state during render)
    const [lastPathname, setLastPathname] = useState(pathname)
    if (pathname !== lastPathname) {
        setLastPathname(pathname)
        setOpen(false)
    }

    // Escape + body scroll lock while open
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
        document.addEventListener("keydown", onKey)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", onKey)
            document.body.style.overflow = ""
        }
    }, [open])

    return (
        <div className="lg:hidden justify-self-end">
            <button
                type="button"
                className="label border-2 border-ink rounded-[4px] h-10 px-4"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen(true)}
            >
                Menu
            </button>

            {open && (
                <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 bg-yellow z-[60] flex flex-col px-5 py-4 overflow-y-auto">
                    <div className="flex items-center justify-between h-12">
                        <span className="font-black text-lg tracking-tight">SYNERGIA</span>
                        <button
                            type="button"
                            aria-label="Close menu"
                            className="label border-2 border-ink rounded-[4px] h-10 px-4 flex items-center gap-2"
                            onClick={() => setOpen(false)}
                        >
                            Close <span aria-hidden="true">✕</span>
                        </button>
                    </div>

                    <nav aria-label="Mobile" className="flex flex-col gap-2 mt-10">
                        {getLinks(signedIn).map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                                className={clsx("display text-[44px]", isActive(pathname, link.href) && "text-brand")}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-10 pb-4">
                        {signedIn ? (
                            <form action={signOutAction}>
                                <PrimaryButton type="submit">Sign out</PrimaryButton>
                            </form>
                        ) : (
                            <LinkButton href="/sign-in">Sign in</LinkButton>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
