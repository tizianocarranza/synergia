import { ProfessionalSignUpForm, OrganizationSignUpForm } from "@/app/ui/account/sign-up-forms"; //Dependiendo de las props que se reciban del layout (en base al boton que toque el usuario) se reenderiza un form u otro
import { LinkButton } from "@/app/ui/buttons/buttons";
import { MainPage } from "@/app/ui/pages/pages";
export default function SignUp() {

  return (
    <MainPage header="Create an account">
      <div className="flex flex-col gap-5">
        <LinkButton href="/sign-up/organization">
          <p>I represent an <span className="text-accent">organization</span></p>
        </LinkButton>
        <LinkButton href="/sign-up/professional">
          <p>I&apos;m a <span className="text-accent">professional</span></p>
        </LinkButton>
      </div>
    </MainPage>
  );
}