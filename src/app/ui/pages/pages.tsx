import React from "react";

export function MainPage({ children, header, text }: Readonly<{ children: React.ReactNode, header?: string, text?: string }>) {
    return (
        <section className="w-full">
        <div className="flex flex-col gap-20 items-center pt-28">
          <div className="flex flex-col gap-3 items-center w-3/4">
                <h1 className={`main-page-header ${header == "Synergia" ? "font-bold" : ""}`}>
                    {header && header}
                </h1>
                {
                    text ? 
                    ( <p>{text}</p> ) : 
                    ""
                }
            </div>
            <div>
                {children}
            </div>
        </div>
        </section>
    )
}

export function LookForPage({ children, header }: Readonly<{ children: React.ReactNode, header: string }>) {
    return(
        <div className="w-full">
        <h1 className="look-for-page-header">{header}</h1>
            <div className="flex-1 w-full items-center justify-center justify-items-center lg:gap-14" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(384px, 1fr))", gridAutoRows: "384px" }}>
                {children}
            </div>
        </div>
    )
}