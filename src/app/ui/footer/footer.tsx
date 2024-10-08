import Link from "next/link"

export default function Footer() {
    return (
        <footer className={`w-full bg-brand text-white flex flex-col pt-16 px-5 pb-2 gap-32`}>

            <div className="w-full grid gap-20 lg:grid-cols-2 items-center justify-center pt-10">


                {/* Contact */}
                <div className="footer-contact flex flex-col gap-3 text-center items-center">
                    <p className="max-w-md text-xs lg:text-sm">Whether you&apos;re a developer looking to expand your career or you represent an organization seeking the best candidates, Synergia provides the platform to synergize and succeed.</p>
                </div>


                {/* Links */}
                <div className="flex gap-24 lg:gap-40 justify-center">

                    <div className="flex flex-col gap-10 items-center lg:items-start">
                        <h1 className="font-bold text-2xl">Links</h1>
                        <ul className="flex flex-col gap-3 items-center lg:items-start">
                            <li className="flex"><Link href="/" className="hover-underline-white">Home</Link></li>
                            <li className="flex"><Link href="/about" className="hover-underline-white">About Us</Link></li>
                            <li className="flex"><Link href="/inbox" className="hover-underline-white">Inbox</Link></li>
                            <li className="flex"><Link href="/account" className="hover-underline-white">Account</Link></li>
                            <li className="flex"><Link href="/faqs" className="hover-underline-white">FAQs</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-10 items-center lg:items-start">
                        <h1 className="font-bold text-2xl">Social</h1>
                        <ul className="flex flex-col gap-3 items-center lg:items-start">
                            <li className="flex"><a href="/" className="hover-underline-white">Facebook</a></li>
                            <li className="flex"><a href="/" className="hover-underline-white">Twitter</a></li>
                            <li className="flex"><a href="/" className="hover-underline-white">LinkedIn</a></li>
                            <li className="flex"><a href="/" className="hover-underline-white">Instagram</a></li>
                        </ul>
                    </div>

                </div>

                {/* Social */}
            </div>

            {/* Logo, Copyright & legal */}
            <div className="w-full grid items-center grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 lg:items-end px-5 pt-10 pb-2 border-t border-white">
                <h1 className=" text-3xl text-center tracking-tight lg:text-9xl lg:justify-self-start">Synergia</h1>


                <div className="flex flex-col items-center justify-center gap-20 lg:flex-row lg:gap-10 lg:items-end lg:justify-end text-xs text-left w-full">

                    <ul className="flex flex-col gap-5 font-semibold text-center lg:text-right">
                        <li><a href="/terms-of-service">Terms of Service</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/cookies-policy">Cookies Policy</a></li>
                    </ul>

                    <div className="hidden lg:block h-24 w-[1px] bg-white"></div>

                    <div className="flex flex-col gap-1 text-center lg:text-left">
                        <p>Developed by Tiziano Carranza.</p>
                        <p>© 2024 Synergia. All rights reserved.</p>
                    </div>
                </div>



            </div>
        </footer>
    )
}

{/* Newsletter */ }
{/*             <div className="footer-newsletter">
    <p>Subscribe to our newsletter</p>
    <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
    </form>
</div> */}