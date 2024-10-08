import Link from "next/link"

export function LinkButton({ children, href }: Readonly<{ children: React.ReactNode, href: string }>) {
    return (
        <Link href={href} className="flex h-16 items-center justify-center bg-brand text-white rounded-lg p-5 hover:bg-accent transition-colors text-sm font-semibold">
            {children}
        </Link>
    )
}

export function PrimaryButton({ children, action, type = "button" }: Readonly<{ children: React.ReactNode, action?: () => void, type?: "button" | "submit" | "reset"} >) {
    return (
            <button 
            type={type}
            onClick={action} 
            className="flex h-16 items-center justify-center bg-brand text-white rounded-lg p-5 hover:bg-accent transition-colors text-sm font-semibold">
                {children}
            </button>
    )
} 


/* 
<div className="h-16 bg-brand rounded-lg flex p-5 items-center justify-center">
    <p className="font-semibold text-white">I want a team!</p>
</div>

*/