export default function AuthLayout({ title, aside, children }: Readonly<{ title: React.ReactNode, aside: React.ReactNode, children: React.ReactNode }>) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] min-h-[calc(100vh-4rem)] bg-paper">
            <section className="bg-brand text-white border-b-2 lg:border-b-0 lg:border-r-2 border-ink px-6 py-8 lg:p-8 xl:p-10 flex flex-col justify-between gap-6 lg:gap-10 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
                <h1 className="display text-[32px] lg:text-4xl xl:text-5xl break-words">
                    {title}
                </h1>
                <div className="text-sm font-semibold">{aside}</div>
            </section>
            <section className="px-6 py-8 lg:p-12 flex items-start lg:items-center justify-center">
                <div className="w-full max-w-lg">{children}</div>
            </section>
        </div>
    )
}
