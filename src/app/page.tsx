import Hero from "./ui/home/hero/Hero"
import Bento from "./ui/home/bento"
import Band from "./ui/home/band"
import { getHomeStats } from "@/app/lib/data/read"

export default async function Page() {
  const stats = await getHomeStats()

  return (
    <>
      <Hero />
      <Bento stats={stats} />
      <Band />
    </>
  )
}
