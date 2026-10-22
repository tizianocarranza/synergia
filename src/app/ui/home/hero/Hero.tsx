import { LinkButton } from "../../buttons/buttons"

export default function Hero() {
  return (
    <section className="w-full max-w-7xl px-4 pt-12 pb-12 lg:px-10 lg:pt-20 lg:pb-16 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
      <div className="flex flex-col gap-5">
        <span className="label">Talent marketplace for developers</span>
        <h1 className="display text-[3.25rem] sm:text-6xl lg:text-[7.5rem]">
          Bringing <span className="text-brand">talent</span> together.
        </h1>
      </div>
      <div className="flex flex-col gap-6 lg:pb-3">
        <p className="text-lg font-medium">
          Developers find the teams they want to build with. Organizations find the people who&apos;ll ship.
        </p>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/professionals" variant="dark">Find talent</LinkButton>
          <LinkButton href="/opportunities" variant="light">Find a team</LinkButton>
        </div>
      </div>
    </section>
  )
}
