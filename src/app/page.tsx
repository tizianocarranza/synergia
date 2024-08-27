import { MainPage } from "@/app/ui/pages/pages";
import { LinkButton } from "@/app/ui/buttons/buttons";

export default function Home() {
  return (
    <MainPage
      header="Synergia"
      text="Where developers find opportunities and organizations find talents."
    >
        <LinkButton href="/opportunities">
          <p>Look for <span className="text-brand">opportunities</span> </p>
        </LinkButton>
        <LinkButton href="/professionals">
          <p>Look for <span className="text-brand">professionals</span> </p>
        </LinkButton>
    </MainPage>
  );
}

