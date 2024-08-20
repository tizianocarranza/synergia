import { MainPage } from "@/app/ui/pages/pages";
import SignInForm from "@/app/ui/account/sign-in-form";

export default function SignIn() {
    return (
        <MainPage header="Sign in">
            <SignInForm />
        </MainPage>
    )
}