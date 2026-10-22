import { LinkButton } from "@/app/ui/buttons/buttons";

export default function NotFound() {
    return (
        <section className="flex flex-col items-start gap-6 w-full max-w-7xl mx-auto px-4 lg:px-10 pt-10 pb-20 min-h-[60vh]">
            <h1 className="display text-9xl sm:text-[14rem]">
                4<span className="text-brand">0</span>4
            </h1>
            <p className="text-lg">This page doesn&apos;t exist.</p>
            <LinkButton href="/">Back home</LinkButton>
        </section>
    );
}
