"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export function getLinks(signedIn: boolean) {
    return [
        { name: "Home", href: "/" },
        { name: "Professionals", href: "/professionals" },
        { name: "Opportunities", href: "/opportunities" },
        { name: "About", href: "/about" },
        ...(signedIn ? [{ name: "Inbox", href: "/inbox" }] : []),
    ]
}

export function isActive(pathname: string | null, href: string) {
    if (!pathname) return false
    return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function NavLinks({ signedIn }: Readonly<{ signedIn: boolean }>) {
    const pathname = usePathname()
    return (
        <nav aria-label="Main" className="hidden lg:flex items-center justify-center gap-8 text-sm font-extrabold">
            {getLinks(signedIn).map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={clsx(isActive(pathname, link.href) && "underline decoration-2 underline-offset-[6px]")}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}

// Sign in link: hidden in account routes (same behavior as before). On /sign-in it offers Sign up.
// Shared by the desktop header and the mobile menu.
export function signInTarget(pathname: string | null): { href: string, name: string } | null {
    const path = pathname ?? ""
    if (path.startsWith("/account")) return null
    return path.startsWith("/sign-in") ? { href: "/sign-up", name: "Sign up" } : { href: "/sign-in", name: "Sign in" }
}

export function SignInLink() {
    const target = signInTarget(usePathname())
    if (!target) return null
    return (
        <Link href={target.href} className="text-sm font-extrabold underline-offset-[6px] hover:underline decoration-2">
            {target.name}
        </Link>
    )
}
