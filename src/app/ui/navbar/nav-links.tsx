"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
                    className="font-bold text-brand"
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
                <button className="font-bold text-brand">Sign Out</button>
            </div>
        )
    )
}

export default function NavLinks() {
    const links = [
        { name: "Home", href: "/", icon: "" },
        { name: "About", href: "/about", icon: "" },
        { name: "Inbox", href: "/inbox", icon: "" },
        { name: "Account", href: "/account", icon: "" },
    ]

    const pathname = usePathname();

    return (
        <div className="flex flex-1 justify-center items-center gap-10">
            {
                links.map((link) => {
                    return (
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