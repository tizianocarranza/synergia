import React from "react";
import { LinkButton } from "@/app/ui/buttons/buttons";

export function MainPage({ header, text, children }: Readonly<{ header: React.ReactNode, text?: string, children: React.ReactNode }>) {
    return (
        <section className="flex flex-col items-start gap-10 w-full max-w-7xl mx-auto px-4 lg:px-10 pt-10 pb-20 min-h-[60vh]">
            <div className="flex flex-col items-start gap-4 w-full">
                <h1 className="display text-5xl sm:text-7xl lg:text-8xl break-words">
                    {header}
                </h1>
                {text && <p className="text-lg max-w-2xl">{text}</p>}
            </div>
            <div className="w-full">
                {children}
            </div>
        </section>
    )
}

export function LookForPage({ header, count, filters, clearHref, hasFilters, children }: Readonly<{ header: string, count: number, filters: React.ReactNode, clearHref: string, hasFilters: boolean, children: React.ReactNode }>) {
    return (
        <section className="flex flex-col w-full max-w-7xl mx-auto px-4 lg:px-10 pt-10 pb-20 min-h-screen">
            <div className="border-b-2 border-ink pb-6">
                <h1 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl break-words">
                    {header} <span className="text-2xl lg:text-3xl align-top">({count})</span>
                </h1>
            </div>
            {filters}
            {count === 0 ? (
                <div className="flex flex-col items-start gap-5 border-2 border-ink rounded-[6px] bg-white p-8">
                    <p className="font-semibold text-lg">{hasFilters ? "No matches for these filters." : "Nothing here yet."}</p>
                    {hasFilters && <LinkButton href={clearHref} variant="light">Clear filters</LinkButton>}
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
                    {children}
                </div>
            )}
        </section>
    )
}
