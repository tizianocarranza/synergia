import Link from "next/link";
import AuthLayout from "@/app/ui/account/auth-layout";
import { OrganizationSignUpForm } from "@/app/ui/account/sign-up-forms";

export default function OrganizationSignUp() {
  return (
    <AuthLayout
      title={<>Join as an <span className="text-accent">organization.</span></>}
      aside={<>Already have an account? <Link href="/sign-in" className="underline underline-offset-4 font-extrabold">Sign in</Link></>}
    >
      <OrganizationSignUpForm />
    </AuthLayout>
  );
}
