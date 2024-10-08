import { ProfessionalSignUpForm, OrganizationSignUpForm } from "@/app/ui/account/sign-up-forms"; //Dependiendo de las props que se reciban del layout (en base al boton que toque el usuario) se reenderiza un form u otro
import { LinkButton } from "@/app/ui/buttons/buttons";
import { MainPage } from "@/app/ui/pages/pages";
export default function SignUp() {

  return (
    <MainPage header="Create an account">
      <div className="flex flex-col gap-5">
        <LinkButton href="/sign-up/organization">
          I represent anorganization
        </LinkButton>
        <LinkButton href="/sign-up/professional">
          I&apos;m a professional
        </LinkButton>
      </div>
    </MainPage>
  );
}