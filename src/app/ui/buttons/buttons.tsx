import Link from "next/link"
import clsx from "clsx"

type Variant = "dark" | "light" | "white"

const base = "inline-flex h-12 items-center justify-center px-5 border-2 border-ink rounded-[4px] font-extrabold uppercase text-[13px] tracking-wide transition-transform hover:-translate-x-px hover:-translate-y-px"

const variants: Record<Variant, string> = {
    dark: "bg-ink text-white shadow-hard-brand",
    light: "bg-white text-ink shadow-hard",
    white: "bg-white text-ink",
}

export function LinkButton({ children, href, variant = "dark" }: Readonly<{ children: React.ReactNode, href: string, variant?: Variant }>) {
    return (
        <Link href={href} className={clsx(base, variants[variant])}>
            {children}
        </Link>
    )
}

export function PrimaryButton({ children, action, type = "button", variant = "dark" }: Readonly<{ children: React.ReactNode, action?: () => void, type?: "button" | "submit" | "reset", variant?: Variant }>) {
    return (
        <button type={type} onClick={action} className={clsx(base, variants[variant])}>
            {children}
        </button>
    )
}
