import { MainPage } from "@/app/ui/pages/pages";
import { LinkButton, PrimaryButton } from "@/app/ui/buttons/buttons";

import Link from "next/link";


export default function Account() {

  return (

    <MainPage
      header="New here?"
      text="Create or sign-in with an existing account."
    >
      <div className="flex flex-col gap-5">
        <LinkButton href="/sign-up/organization">
          I represent anorganization
        </LinkButton>
        <LinkButton href="/sign-up/professional">
          I&apos;m a professional
        </LinkButton>
      </div>
      <Link href="/sign-in" className="text-sm">Or sign in to your existing account.</Link>
    </MainPage>
  );
}
