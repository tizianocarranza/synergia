import React from "react"
import clsx from "clsx"
import { Avatar } from "@/app/ui/avatar/avatar"
import { Tag } from "@/app/ui/tag/tag"
import { ProfessionalWithColors, OrganizationWithColors } from "@/app/lib/types/general"

/* Solo http/https se vuelven link; cualquier otra cosa (javascript:, texto suelto) se muestra como texto */
function safeWebsite(website?: string): string | null {
    if (!website) return null
    try {
        const url = new URL(website)
        return url.protocol === "http:" || url.protocol === "https:" ? url.href : null
    } catch {
        return null
    }
}

function Tile({ label, children, className }: Readonly<{ label: string, children: React.ReactNode, className?: string }>) {
    return (
        <div className={clsx("border-2 border-ink rounded-[6px] p-5 min-w-0", className ?? "bg-white")}>
            <span className="label opacity-60">{label}</span>
            {children}
        </div>
    )
}

export function ProfileView({ user, action }: Readonly<{ user: ProfessionalWithColors | OrganizationWithColors, action?: React.ReactNode }>) {
    const professional = "specialty" in user ? user : null
    const organization = "area" in user ? user : null
    const eyebrow = professional ? `Professional · ${professional.specialty}` : `Organization · ${organization?.area}`

    /* Dos líneas si el nombre tiene dos palabras o más: primera palabra y el resto */
    const trimmed = user.name.trim()
    const spaceAt = trimmed.search(/\s/)
    const firstLine = spaceAt === -1 ? trimmed : trimmed.slice(0, spaceAt)
    const secondLine = spaceAt === -1 ? "" : trimmed.slice(spaceAt).trim()

    const website = safeWebsite(organization?.website)

    return (
        <article className="w-full">
            <div className="border-b-2 border-ink" style={{ background: user.color }}>
                <div className="flex flex-col gap-6 px-5 py-8 mx-auto w-full sm:px-[8.33%] lg:items-end lg:flex-row lg:justify-between xl:px-[16.67%]">
                    <div className="flex flex-col gap-6 min-w-0 lg:flex-row lg:items-end lg:gap-6">
                        <Avatar key={user.image} name={user.name} image={user.image} size={120} className="rounded-[4px] shadow-hard-lg" />
                        <div className="min-w-0">
                            <span className="label">{eyebrow}</span>
                            <h1 className="display mt-1.5 text-[2.75rem] sm:text-5xl lg:text-[4.5rem] break-words">
                                {firstLine}
                                {secondLine && <><br />{secondLine}</>}
                            </h1>
                        </div>
                    </div>
                    {action && <div className="shrink-0">{action}</div>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 px-5 py-8 mx-auto w-full sm:px-[8.33%] lg:grid-cols-4 xl:px-[16.67%]">
                {professional ? (
                    <>
                        <Tile label="Experience" className="bg-white col-span-2 lg:col-span-1">
                            <div className="mt-2 text-4xl font-black tracking-tight">{professional.experience} yrs</div>
                        </Tile>
                        <Tile label="Status" className={clsx("col-span-2 lg:col-span-1", professional.employmentStatus === "unemployed" ? "bg-accent" : "bg-white")}>
                            <div className="mt-2 text-2xl font-black">{professional.employmentStatus === "unemployed" ? "Open to work" : "Employed"}</div>
                        </Tile>
                    </>
                ) : (
                    <>
                        <Tile label="Area" className="bg-white col-span-2 lg:col-span-1">
                            <div className="mt-2"><Tag color={user.color}>{organization?.area}</Tag></div>
                        </Tile>
                        <Tile label="Website" className="bg-white col-span-2 lg:col-span-1">
                            <div className="mt-2 text-lg font-bold break-all">
                                {website ? (
                                    <a href={website} target="_blank" rel="noopener noreferrer" className="underline">{organization?.website}</a>
                                ) : (
                                    organization?.website || "—"
                                )}
                            </div>
                        </Tile>
                    </>
                )}
                <Tile label="About" className="bg-white col-span-2">
                    <p className="mt-2 text-sm leading-relaxed whitespace-pre-line break-words">{user.description}</p>
                </Tile>
            </div>
        </article>
    )
}
