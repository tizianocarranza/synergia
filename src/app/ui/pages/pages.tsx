import React from "react";

export function MainPage({ children, header, text }: Readonly<{ children: React.ReactNode, header?: string, text?: string }>) {
    return (
        <section className="flex flex-col gap-28 items-center pt-28 w-11/12 lg:w-5/6 xl:w-2/3 min-h-screen">
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
            <div className="w-full flex flex-col gap-10 items-center">
                {children}
            </div>
        </section>
    )
}

export function LookForPage({ children, header }: Readonly<{ children: React.ReactNode, header: string }>) {
    return(
        <section className="flex flex-col gap-28 items-center pt-36 w-11/12 lg:w-5/6 xl:w-2/3 min-h-screen">
        <h1 className="main-page-header">{header}</h1>
            <div className="flex-1 w-full items-center justify-center justify-items-center lg:gap-14" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(384px, 1fr))", gridAutoRows: "384px" }}>
                {children}
            </div>
        </section>
    )
}