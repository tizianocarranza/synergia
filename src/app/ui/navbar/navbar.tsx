import NavLinks from "./nav-links"
import Link from "next/link"

export default function Navbar(){
    return (
        <header className="fixed flex w-screen h-14 min-h-14 justify-center items-center top-0 left-0 z-50 text-sm font-semibold">
            <div className="grid grid-cols-3 items-center w-full h-full bg-black bg-opacity-75 backdrop-blur-lg list-none">
                <Link href="/">
                    <li className="hidden lg:block font-bold text-brand ml-5">Synergia</li>
                </Link>
                <NavLinks/>
            </div>
        </header>
    )
}