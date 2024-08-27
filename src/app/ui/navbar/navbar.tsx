import { headers } from "next/headers";
import { auth, signOut } from "../../../../auth"
import NavLinks, { SignInLink, SignOutLink, SynergiaLink } from "./nav-links"

export default async function Navbar() {
    let session = await auth();
    const headersList = headers();


    return (
        <header className="fixed flex w-screen h-14 min-h-14 justify-center items-center top-0 left-0 z-50 text-sm font-semibold bg-black bg-opacity-75 backdrop-blur-lg">
            <div className="grid grid-cols-3 items-center w-11/12 h-full  list-none">
                <SynergiaLink />
                <NavLinks />
                { (
                    session?.user ? (
                        <form action={async () => { "use server"; await signOut() }} className="flex flex-1 justify-end items-center gap-10 text-sm">
                            <SignOutLink />
                        </form>
                    ) : <SignInLink />
                )
                }
            </div>
        </header>
    )
}