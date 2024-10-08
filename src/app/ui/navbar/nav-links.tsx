"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

export const SynergiaLink = () => {
    return (
        <div className="flex flex-1 justify-start items-center gap-10">
            <Link href="/" className="hidden lg:inline-block w-5 font-bold text-brand">
                Synergia
            </Link>
        </div>
    )
}


export const SignInLink = () => {
    const currentUrl = usePathname();

    const shouldRenderAuthButtons = !(
        currentUrl?.startsWith('/account')
    );

    return (
        shouldRenderAuthButtons && (
            <div className="flex flex-1 justify-end items-center gap-10">
                <Link
                    href={currentUrl.startsWith("/sign-in") ? "/sign-up" : "/sign-in"}
                    className="font-bold hover-underline"
                >{currentUrl.startsWith("/sign-in") ? "Sign up" : "Sign in"}</Link>
            </div>
        )
    )
}

export const SignOutLink = () => {
    const currentUrl = usePathname();

    const shouldRenderAuthButtons = !(
        currentUrl?.startsWith('/account') ||
        currentUrl?.startsWith('/sign-in') ||
        currentUrl?.startsWith('/sign-up')
    );

    return (
        shouldRenderAuthButtons && (
            <div className="flex flex-1 justify-end items-center gap-10">
                <button className="font-bold text-brand hover-underline">Sign Out</button>
            </div>
        )
    )
}

/* TODO */
/* export function MobileLinks() {
    const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false);

    const toggleMenu = () => setMobileMenuIsActive(!mobileMenuIsActive);

    const links = [
        { name: "Home", href: "/", icon: "" },
        { name: "About", href: "/about", icon: "" },
        { name: "Inbox", href: "/inbox", icon: "" },
        { name: "Account", href: "/account", icon: "" },
    ];

    return (
        <div className={`lg:hidden flex flex-col flex-1 justify-center items-center gap-10 ${mobileMenuIsActive ? "h-screen w-screen" : "h-full w-full"}`}>
            <div className={`flex flex-col ${mobileMenuIsActive ? "h-screen w-screen" : "h-full w-full"}`}>
                <div>
                    <Image 
                        src={mobileMenuIsActive ? "/close.svg" : "/navIcon.svg"} 
                        alt={mobileMenuIsActive ? "Close menu button" : "Open menu button"}
                        height={25} 
                        width={25}
                        onClick={toggleMenu}
                        aria-expanded={mobileMenuIsActive} // Accesibilidad: indica si el menú está abierto
                        aria-label={mobileMenuIsActive ? "Close menu" : "Open menu"} // Accesibilidad: etiqueta del botón
                    />
                </div>

                <div className={`${mobileMenuIsActive ? "flex" : "hidden"} flex-col gap-5 mt-5`}>
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover-underline"
                            onClick={toggleMenu} // Cerrar el menú al hacer clic en un enlace
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
} */


export function NavLinks() {
    const links = [
        { name: "Home", href: "/", icon: "" },
        { name: "About", href: "/about", icon: "" },
        { name: "Inbox", href: "/inbox", icon: "" },
        { name: "Account", href: "/account", icon: "" },
    ]
    return (
        <div className="flex flex-row flex-1 justify-center items-center gap-10">
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="hover-underline"
                    >{link.name}</Link>
                )
            })}
        </div>
    )
}

