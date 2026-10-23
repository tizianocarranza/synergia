import { specialties, areas } from "@/app/lib/types/general"

export default function Band() {
  const items = [...specialties.slice(0, 8), ...areas.filter((a) => a !== "Other")]

  return (
    <div className="w-full mt-16 bg-ink text-paper border-y-2 border-ink py-4 overflow-hidden whitespace-nowrap">
      <div className="flex gap-8 px-4 lg:px-10 display text-[22px]">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}
