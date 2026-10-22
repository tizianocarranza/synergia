import Link from "next/link";
import AuthLayout from "@/app/ui/account/auth-layout";
import { ProfessionalSignUpForm } from "@/app/ui/account/sign-up-forms";

export default function ProfessionalSignUp() {
  return (
    <AuthLayout
      title={<>Join as a <span className="text-accent">professional.</span></>}
      aside={<>Already have an account? <Link href="/sign-in" className="underline underline-offset-4 font-extrabold">Sign in</Link></>}
    >
      <ProfessionalSignUpForm />
    </AuthLayout>
  );
}
