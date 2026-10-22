import Link from "next/link";

export default function NewHere() {
    return (
        <div className="px-6 py-10 lg:px-12 lg:py-16 max-w-5xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center gap-8">
            <h1 className="display text-[40px] sm:text-6xl lg:text-8xl">
                New <span className="text-brand">here?</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Link
                    href="/sign-up/professional"
                    className="card-lift block bg-brand text-white border-2 border-ink rounded-[6px] p-6 md:p-8 min-h-48"
                >
                    <span className="display block text-2xl md:text-3xl break-words">I&apos;m a professional</span>
                    <span className="block mt-4 text-sm font-semibold">Show organizations what you work with.</span>
                </Link>
                <Link
                    href="/sign-up/organization"
                    className="card-lift block bg-accent text-ink border-2 border-ink rounded-[6px] p-6 md:p-8 min-h-48"
                >
                    <span className="display block text-2xl md:text-3xl break-words">I represent an organization</span>
                    <span className="block mt-4 text-sm font-semibold">Find developers by stack and experience.</span>
                </Link>
            </div>
            <p className="text-sm font-semibold">
                Already have an account? <Link href="/sign-in" className="underline underline-offset-4 font-extrabold">Sign in</Link>
            </p>
        </div>
    )
}
