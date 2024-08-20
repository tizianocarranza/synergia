import { ProfessionalSignUpForm, OrganizationSignUpForm } from "@/app/ui/account/sign-up-forms"; //Dependiendo de las props que se reciban del layout (en base al boton que toque el usuario) se reenderiza un form u otro
import { LinkButton } from "@/app/ui/buttons/buttons";
import { MainPage } from "@/app/ui/pages/pages";
export default function SignUp() {

  return (
    <MainPage header="Create an account">
      <LinkButton href="/sign-up/organization">
        <p>I represent an <span className="text-brand">organization</span></p>
      </LinkButton>
      <LinkButton href="/sign-up/professional">
        <p>I&apos;m a <span className="text-brand">professional</span></p>
      </LinkButton>
    </MainPage>
  );
}