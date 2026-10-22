import Link from "next/link"
import clsx from "clsx"

type Variant = "dark" | "light" | "white"

const base = "inline-flex h-12 items-center justify-center px-5 border-2 border-ink rounded-[4px] font-extrabold uppercase text-[13px] tracking-wide transition-transform hover:-translate-x-px hover:-translate-y-px"

const variants: Record<Variant, string> = {
    dark: "bg-ink text-white shadow-hard-brand",
    light: "bg-white text-ink shadow-hard",
    white: "bg-white text-ink",
}

export function LinkButton({ children, href, variant = "dark", onClick }: Readonly<{ children: React.ReactNode, href: string, variant?: Variant, onClick?: () => void }>) {
    return (
        <Link href={href} onClick={onClick} className={clsx(base, variants[variant])}>
            {children}
        </Link>
    )
}

export function PrimaryButton({ children, action, type = "button", variant = "dark", ref }: Readonly<{ children: React.ReactNode, action?: () => void, type?: "button" | "submit" | "reset", variant?: Variant, ref?: React.Ref<HTMLButtonElement> }>) {
    return (
        <button ref={ref} type={type} onClick={action} className={clsx(base, variants[variant])}>
            {children}
        </button>
    )
}
