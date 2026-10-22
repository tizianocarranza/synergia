"use client"

import Form from "next/form"
import Link from "next/link"
import { Tag } from "@/app/ui/tag/tag"
import { buildSearchHref, experienceRanges } from "@/app/lib/search"

type Props = {
    basePath: "/professionals" | "/opportunities"
    param: "specialty" | "area"
    current: Record<string, string | undefined>
    topOptions: readonly string[]
    allOptions: readonly string[]
    professionalControls: boolean
}

const expLabels: Record<keyof typeof experienceRanges, string> = {
    "1-2": "1–2 years",
    "3-5": "3–5 years",
    "6-10": "6–10 years",
    "11-20": "11–20 years",
}

export default function SearchFilters({ basePath, param, current, topOptions, allOptions, professionalControls }: Readonly<Props>) {
    const hrefFor = (value?: string) => buildSearchHref(basePath, { ...current, [param]: value })
    const submitOnChange = (e: React.ChangeEvent<HTMLElement>) => e.currentTarget.closest("form")?.requestSubmit()
    const formKey = JSON.stringify(current)

    return (
        <div className="flex flex-col gap-4 py-6">
            <Form action={basePath} key={formKey} className="flex flex-col gap-4">
                {current[param] && <input type="hidden" name={param} value={current[param]} />}

                <div className="flex w-full border-2 border-ink rounded-[4px] bg-white shadow-hard">
                    <input
                        name="q"
                        type="search"
                        defaultValue={current.q ?? ""}
                        placeholder={professionalControls ? "Search by name or description" : "Search organizations"}
                        aria-label="Search"
                        className="grow min-w-0 h-14 border-0 rounded-none text-lg focus:shadow-none"
                    />
                    <button type="submit" className="shrink-0 px-5 bg-ink text-white font-extrabold uppercase text-[13px] tracking-wide">
                        Search
                    </button>
                </div>

                {professionalControls && (
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <label className="flex items-center gap-2 label">
                            Experience
                            <select
                                name="exp"
                                defaultValue={current.exp ?? ""}
                                onChange={submitOnChange}
                                className="h-11 px-2 bg-white border-2 border-ink rounded-[4px] normal-case font-semibold text-sm focus:outline-none focus:shadow-hard-brand"
                            >
                                <option value="">Any</option>
                                {Object.keys(experienceRanges).map((key) => (
                                    <option key={key} value={key}>{expLabels[key as keyof typeof experienceRanges]}</option>
                                ))}
                            </select>
                        </label>
                        <label className="flex items-center gap-2 label cursor-pointer">
                            <input
                                type="checkbox"
                                name="open"
                                value="1"
                                defaultChecked={current.open === "1"}
                                onChange={submitOnChange}
                                className="size-5 shrink-0 cursor-pointer appearance-none border-2 border-ink rounded-[3px] bg-white checked:bg-accent checked:shadow-[inset_0_0_0_3px_white] focus-visible:shadow-hard-brand outline-none"
                            />
                            Open to work only
                        </label>
                    </div>
                )}
            </Form>

            <div className="flex items-start gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible pb-1">
                <Link href={hrefFor(undefined)} className="shrink-0"><Tag active={!current[param]}>All</Tag></Link>
                {topOptions.map((option) => (
                    <Link key={option} href={hrefFor(option)} className="shrink-0">
                        <Tag active={current[param] === option}>{option}</Tag>
                    </Link>
                ))}
                <details className="shrink-0 lg:relative">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <Tag>More</Tag>
                    </summary>
                    <div className="fixed inset-x-4 z-10 mt-2 max-h-72 overflow-y-auto flex flex-wrap gap-2 border-2 border-ink rounded-[4px] bg-paper p-3 shadow-hard lg:absolute lg:inset-x-auto lg:left-0 lg:w-[28rem]">
                        {allOptions.map((option) => (
                            <Link key={option} href={hrefFor(option)}>
                                <Tag active={current[param] === option}>{option}</Tag>
                            </Link>
                        ))}
                    </div>
                </details>
            </div>
        </div>
    )
}
