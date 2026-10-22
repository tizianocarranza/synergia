import Link from "next/link"

const columns = [
    { title: "Explore", links: [
        { name: "Professionals", href: "/professionals" },
        { name: "Opportunities", href: "/opportunities" },
    ] },
    { title: "Synergia", links: [
        { name: "About", href: "/about" },
        { name: "Account", href: "/account" },
        { name: "FAQs", href: "/faqs" },
    ] },
    { title: "Legal", links: [
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Cookies Policy", href: "/cookies-policy" },
    ] },
]

export default function Footer() {
    return (
        <footer className="w-full bg-brand text-white border-t-2 border-ink px-5 lg:px-10 pt-14 selection:text-accent overflow-hidden">
            <div className="grid gap-12 lg:grid-cols-2">
                <p className="max-w-md text-base font-medium">
                    Developers find teams that need their skills. Organizations find people who are ready to build.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {columns.map((col) => (
                        <div key={col.title} className="flex flex-col gap-3">
                            <h2 className="label">{col.title}</h2>
                            <ul className="flex flex-col gap-2 text-sm font-semibold">
                                {col.links.map((l) => (
                                    <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4 decoration-2">{l.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="display text-[18vw] lg:text-[11rem] mt-16 break-words">SYNERGIA</div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-5 text-xs font-semibold border-t-2 border-white/30">
                <p>© {new Date().getFullYear()} Synergia</p>
                <p>Developed by Tiziano Carranza</p>
            </div>
        </footer>
    )
}
