import React from "react";
import { LinkButton } from "@/app/ui/buttons/buttons";

export function MainPage({ children, header, text }: Readonly<{ children: React.ReactNode, header?: string, text?: string }>) {
    return (
        <section className="flex flex-col gap-28 items-center pt-28 w-11/12 lg:w-5/6 xl:w-2/3 min-h-screen">
            <div className="flex flex-col gap-3 items-center w-3/4">
                <h1 className={`main-page-header ${header == "Synergia" ? "font-bold" : ""}`}>
                    {header && header}
                </h1>
                {
                    text ?
                        (<p>{text}</p>) :
                        ""
                }
            </div>
            <div className="w-full flex flex-col gap-10 items-center">
                {children}
            </div>
        </section>
    )
}

export function LookForPage({ header, count, filters, clearHref, children }: Readonly<{ header: string, count: number, filters: React.ReactNode, clearHref: string, children: React.ReactNode }>) {
    return (
        <section className="flex flex-col w-11/12 lg:w-5/6 xl:w-2/3 mx-auto pt-10 pb-20 min-h-screen">
            <div className="border-b-2 border-ink pb-6">
                <h1 className="display text-6xl lg:text-8xl break-words">
                    {header} <span className="text-2xl lg:text-3xl align-top">({count})</span>
                </h1>
            </div>
            {filters}
            {count === 0 ? (
                <div className="flex flex-col items-start gap-5 border-2 border-ink rounded-[6px] bg-white p-8">
                    <p className="font-semibold text-lg">No matches for these filters.</p>
                    <LinkButton href={clearHref} variant="light">Clear filters</LinkButton>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
                    {children}
                </div>
            )}
        </section>
    )
}
