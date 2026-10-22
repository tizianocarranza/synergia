import clsx from "clsx"

export function Tag({ children, active = false, color }: Readonly<{ children: React.ReactNode, active?: boolean, color?: string }>) {
    return (
        <span
            className={clsx(
                "inline-flex items-center border-2 border-ink rounded-[3px] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide",
                !active && !color && "bg-white text-ink",
                active && !color && "bg-ink text-white",
            )}
            style={color ? { backgroundColor: color } : undefined}
        >
            {children}
        </span>
    )
}
