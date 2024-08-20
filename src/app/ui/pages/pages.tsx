import React from "react";

export function MainPage({ children, header, text }: Readonly<{ children: React.ReactNode, header: string, text?: string }>) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10 text-center lg:flex-row lg:text-left lg:w-1/2">
            <div className="flex flex-col lg:flex-1 items-center justify-center gap-5">
                <h1 className={`main-page-header w-full ${header == "Synergia" ? "font-bold" : ""}`}>
                    {header}
                </h1>
                {
                    text ? 
                    ( <p className="w-full">{text}</p> ) : 
                    ""
                }
            </div>
            <div className="flex flex-col lg:flex-1 gap-5 items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export function LookForPage({ children, header }: Readonly<{ children: React.ReactNode, header: string }>) {
    return(
        <div className="w-full mt-28">
        <h1 className="look-for-page-header">{header}</h1>
            <div className="flex-1 w-full items-center justify-center justify-items-center lg:gap-14" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(384px, 1fr))", gridAutoRows: "384px" }}>
                {children}
            </div>
        </div>
    )
}