import Link from "next/link"

export function LinkButton({ children, href }: Readonly<{ children: React.ReactNode, href: string }>) {
    return (
        <Link href={href} className="flex justify-center items-center h-12 w-80 lg:w-full  p-2 rounded-sm bg-white bg-opacity-0 border-2 text-sm text-white hover:bg-opacity-40 hover:text-white transition duration-300 ease-in-out">
            {children}
        </Link>
    )
}

export function PrimaryButton({ children, action, type = "button" }: Readonly<{ children: React.ReactNode, action?: () => void, type?: "button" | "submit" | "reset"} >) {
    return (
            <button 
            type={type}
            onClick={action} 
            className="flex justify-center items-center h-12 w-80 lg:w-full  p-2 rounded-sm bg-white bg-opacity-0 border-2 text-sm text-white hover:bg-opacity-40 hover:text-white transition duration-300 ease-in-out">
                {children}
            </button>
    )
} 
