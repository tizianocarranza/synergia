"use client"

import { PrimaryButton } from "../buttons/buttons"
import { useActionState } from "react"
import { autheticationFormAction, SignInState } from "@/app/lib/data/actions"

export default function SignInForm() {
    const initialState: SignInState = { message: undefined, error: false }
    const [state /* este es el state */, formAction, isPending] = useActionState(autheticationFormAction, initialState)

    return (
        <form action={formAction} className="flex flex-col gap-14 w-80 items-center">
            <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col">
                    <label htmlFor="email">Write your email</label>
                    <input type="email" name="email" id="email" required/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Write your password</label>
                    <input type="password" name="password" id="password" required/>
                </div>
            </div>
            <div className="div" aria-disabled={isPending}>
                <PrimaryButton type="submit">
                    <p className="">Sign in to your account</p>
                </PrimaryButton>
                {
                    state.error && (
                        <p className="form-error">{state.message}</p>
                    )
                }
            </div>
        </form>
    )
}