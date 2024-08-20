import { PrimaryButton } from "../buttons/buttons"

export default function SignInForm() {
    return (
        <form action="" className="flex flex-col gap-14 w-80">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <label htmlFor="email">Write your email or username</label>
                    <input type="email" name="email" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Write your password</label>
                    <input type="password" name="password" />
                </div>
            </div>
            <PrimaryButton type="submit">
                <p className="text-brand">Sign in to your account</p>
            </PrimaryButton>
        </form>
    )
}