
import { LinkButton } from '../../buttons/buttons'

import styles from "./hero.module.css"

import Image from 'next/image'
import teamwork from "../../../../../public/teamwork.svg"

function Hero() {
  return (

    <section className="min-h-screen flex flex-col gap-24 px-4 lg:gap-10 justify-center items-center lg:flex-row lg:justify-between w-full lg:px-20">

      <div className="flex items-center justify-center flex-col gap-10 lg:items-start">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-4xl text-center md:text-5xl lg:text-7xl lg:text-left">Bringing talent together.</h1>
          <p className='text-sm lg:text-left'>Where connections lead to collaborations, and collaborations turn into limitless possibilities.</p>
        </div>
        <div className="flex gap-3 justify-center lg:justify-start">
          <LinkButton href="/professionals">
            I want to hire!
          </LinkButton>
          <LinkButton href="/opportunities">
            I want a team!
          </LinkButton>
        </div>
      </div>

      <div className="">
        <Image src={teamwork} alt='Team-work illustration' />
      </div>
    </section>

  )
}

export default Hero;

/*     <section className={` min-h-screen w-full px-5`}>
      <div className="justify-self-end flex flex-col gap-12">
        <h1 className="text-3xl text-center xl:text-7xl font-bold xl:text-left">Bringing talent together</h1>
        <div className="flex gap-3">
          <LinkButton href="/professionals">
            <p className="font-semibold">I want to hire!</p>
          </LinkButton>
          <LinkButton href="/opportunities">
            <p className="font-semibold">I want a team!</p>
          </LinkButton>
        </div>
      </div>
      <div className="justify-self-start">
        <Image src={teamwork} alt='Team-work illustration' />
      </div>
    </section> */