import { MainPage } from "@/app/ui/pages/pages";
import { LinkButton } from "@/app/ui/buttons/buttons";

export default function Account() {

  return (
    
    <MainPage
      header="New here?"
      text="Create or sign-in with an existing account."
    >
      <div className="flex flex-col gap-5">
        <LinkButton href="/sign-in">
          <p>I <span className="text-accent">already</span> have an account</p>
        </LinkButton>
        <LinkButton href="/sign-up">
          <p>Let&apos;s <span className="text-accent">create</span> an account</p>
        </LinkButton>
      </div>
    </MainPage>
  );
}

/* 


*/
