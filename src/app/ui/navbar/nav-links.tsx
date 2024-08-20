"use client"

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"

export default function NavLinks() {
    const links = [
        {name: "Home", href:"/", icon:""},
        {name: "About", href:"/about", icon:""},
        {name: "Account", href:"/account", icon:""}
    ]

    const pathname = usePathname();

    return (
        <div className="flex flex-1 justify-center items-center gap-10">
        {
            links.map((link) => {
                return(
                    <Link
                    key={link.name}
                    href={link.href}
                    className="hover-underline"
                    >{link.name}</Link>
                )
            })
        }
        </div>
    )
}