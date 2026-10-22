import clsx from "clsx"
import Link from "next/link"

import { ProfessionalWithColors } from "@/app/lib/types/general"
import { Avatar } from "@/app/ui/avatar/avatar"
import { Tag } from "@/app/ui/tag/tag"

export default function ProfessionalCard({ professional }: { professional: ProfessionalWithColors }) {
    const employed = professional.employmentStatus === "employed"

    return (
        <Link href={`/${professional._id}`} className="block h-full">
            <article className={clsx("card-lift border-2 border-ink rounded-[6px] bg-white overflow-hidden h-full flex flex-col", employed && "opacity-55")}>
                <div className="h-[74px] shrink-0 border-b-2 border-ink" style={{ background: professional.color }} />
                <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
                    <Avatar key={professional.image} name={professional.name} image={professional.image} size={48} className="-mt-6 rounded-[4px]" />
                    <h3 className="text-[17px] font-black leading-tight break-words">{professional.name}</h3>
                    <p className="text-sm font-bold break-words">{professional.specialty} · {professional.experience} years</p>
                    <p className="text-sm line-clamp-3 break-words">{professional.description}</p>
                    <div className="mt-auto pt-2">
                        {employed ? <Tag>Employed</Tag> : <Tag color="#50D1B2">Open to work</Tag>}
                    </div>
                </div>
            </article>
        </Link>
    )
}
