import Link from "next/link"
import clsx from "clsx"
import { Avatar } from "@/app/ui/avatar/avatar"
import { Tag } from "@/app/ui/tag/tag"
import { buildSearchHref } from "@/app/lib/search"
import type { HomeStats } from "@/app/lib/home-stats"

const tile = "flex flex-col justify-between gap-4 border-2 border-ink rounded-[6px] p-5 min-w-0"
const lift = "card-lift"

export default function Bento({ stats }: Readonly<{ stats: HomeStats }>) {
  const { openProfessionals, organizations, topSpecialty, featured } = stats

  return (
    <section className="w-full max-w-7xl px-4 lg:px-10 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr] lg:grid-rows-[150px_150px]">
      <Link href="/professionals?open=1" className={clsx(tile, lift, "bg-brand text-white lg:row-span-2")}>
        <span className="label">I want to hire</span>
        <div className="flex flex-col gap-2">
          <span className="display text-8xl lg:text-[9rem]">{openProfessionals}</span>
          <span className="text-lg font-bold">{openProfessionals === 1 ? "developer" : "developers"} open to work</span>
        </div>
      </Link>

      <Link href="/opportunities" className={clsx(tile, lift, "bg-accent")}>
        <span className="label">I want a team</span>
        <span className="display text-4xl">{organizations} {organizations === 1 ? "org" : "orgs"}</span>
      </Link>

      {topSpecialty ? (
        <Link href={buildSearchHref("/professionals", { specialty: topSpecialty.name })} className={clsx(tile, lift, "bg-yellow")}>
          <span className="label">Top specialty</span>
          <span className="display text-3xl break-words">{topSpecialty.name}</span>
        </Link>
      ) : (
        <div className={clsx(tile, "bg-yellow")}>
          <span className="label">Top specialty</span>
          <span className="display text-3xl">—</span>
        </div>
      )}

      {featured ? (
        <Link href={`/${featured._id}`} className={clsx(tile, lift, "bg-white sm:flex-row sm:items-center sm:justify-start sm:gap-5 lg:col-span-2")}>
          <Avatar key={featured.image} name={featured.name} image={featured.image} size={72} className="rounded-[4px]" />
          <div className="flex flex-col gap-1 min-w-0">
            <span className="label">Featured</span>
            <span className="display text-2xl break-words">{featured.name}</span>
            <span className="text-sm font-bold">{featured.specialty} · {featured.experience} years</span>
          </div>
          <div className="sm:ml-auto">
            <Tag active>Open to work</Tag>
          </div>
        </Link>
      ) : (
        <div className={clsx(tile, "bg-white lg:col-span-2")}>
          <span className="label">Featured</span>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-lg font-bold">No one is open to work yet.</span>
            <Link href="/sign-up/professional" className="font-extrabold underline">Create a professional profile</Link>
          </div>
        </div>
      )}
    </section>
  )
}
