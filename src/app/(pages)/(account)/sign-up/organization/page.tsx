import Link from "next/link";
import AuthLayout from "@/app/ui/account/auth-layout";
import { OrganizationSignUpForm } from "@/app/ui/account/sign-up-forms";

export default function OrganizationSignUp() {
  return (
    <AuthLayout
      title={<>Join as an <span className="text-yellow">organization.</span></>}
      titleClassName="text-[40px] lg:text-5xl xl:text-6xl 2xl:text-7xl"
      aside={<>Already have an account? <Link href="/sign-in" className="underline underline-offset-4 font-extrabold">Sign in</Link></>}
    >
      <OrganizationSignUpForm />
    </AuthLayout>
  );
}
