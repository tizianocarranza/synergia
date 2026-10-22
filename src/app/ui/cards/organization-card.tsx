import Link from "next/link"

import { OrganizationWithColors } from "@/app/lib/types/general"
import { Avatar } from "@/app/ui/avatar/avatar"
import { Tag } from "@/app/ui/tag/tag"

// Hostname for display; a malformed URL must not throw, it just hides the domain.
function getDomain(website?: string): string | null {
    if (!website) return null
    try {
        return new URL(website).hostname.replace(/^www\./, "") || null
    } catch {
        return null
    }
}

export default function OrganizationCard({ organization }: { organization: OrganizationWithColors }) {
    const domain = getDomain(organization.website)

    return (
        <Link href={`/${organization._id}`} className="block h-full">
            <article className="card-lift border-2 border-ink rounded-[6px] bg-white overflow-hidden h-full flex flex-col">
                <div className="h-[74px] shrink-0 border-b-2 border-ink" style={{ background: organization.color }} />
                <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
                    <Avatar key={organization.image} name={organization.name} image={organization.image} size={48} className="-mt-6 rounded-[4px]" />
                    <h3 className="text-[17px] font-black leading-tight break-words">{organization.name}</h3>
                    <p className="text-sm font-bold break-words">
                        {organization.area}
                        {domain && <span className="font-medium"> · {domain}</span>}
                    </p>
                    <p className="text-sm line-clamp-3 break-words">{organization.description}</p>
                    <div className="mt-auto pt-2">
                        <Tag>{organization.area}</Tag>
                    </div>
                </div>
            </article>
        </Link>
    )
}
