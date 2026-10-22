import Link from "next/link"
import { auth, signOut } from "../../../../auth"
import { NavLinks, SignInLink } from "./nav-links"
import MobileMenu from "./mobile-menu"
import { PrimaryButton } from "../buttons/buttons"

async function signOutAction() {
    "use server"
    await signOut()
}

export default async function Navbar() {
    const session = await auth()
    const signedIn = !!session?.user

    return (
        <header className="sticky top-0 z-50 w-full bg-paper border-b-2 border-ink h-16">
            <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full h-full px-5 lg:px-10">
                <Link href="/" className="font-black text-lg tracking-tight justify-self-start">SYNERGIA</Link>

                <NavLinks signedIn={signedIn} />

                <div className="hidden lg:flex items-center justify-end gap-5">
                    {signedIn ? (
                        <>
                            <span className="text-sm font-bold">{session?.user?.name}</span>
                            <form action={signOutAction}>
                                <PrimaryButton type="submit" variant="light">Sign out</PrimaryButton>
                            </form>
                        </>
                    ) : <SignInLink />}
                </div>

                <MobileMenu signedIn={signedIn} signOutAction={signOutAction} />
            </div>
        </header>
    )
}
