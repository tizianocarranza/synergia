import Link from "next/link";
import AuthLayout from "@/app/ui/account/auth-layout";
import SignInForm from "@/app/ui/account/sign-in-form";

export default function SignIn() {
    return (
        <AuthLayout
            title={<>Welcome <span className="text-accent">back.</span></>}
            aside={<>No account yet? <Link href="/sign-up" className="underline underline-offset-4 font-extrabold">Sign up</Link></>}
        >
            <SignInForm />
        </AuthLayout>
    )
}
