import { OrganizationSignUpForm } from "@/app/ui/account/sign-up-forms"; //Dependiendo de las props que se reciban del layout (en base al boton que toque el usuario) se reenderiza un form u otro
import { LinkButton } from "@/app/ui/buttons/buttons";
import { MainPage } from "@/app/ui/pages/pages";
export default function OrganizationSignUp() {

  return (
    <MainPage header="Welcome recruiter!">
        <OrganizationSignUpForm />
    </MainPage>
  );
}