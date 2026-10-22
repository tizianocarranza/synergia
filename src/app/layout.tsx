import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Navbar from "@/app/ui/navbar/navbar";
import Footer from "./ui/footer/footer";


const epilogue = localFont({
  src: '../../public/fonts/epilogue/fonts/Epilogue-Variable.woff2',
  weight: "100 900",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Synergia",
  description: "Synergia connects developers with the organizations that need them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`relative flex flex-col items-center text-lg bg-paper text-ink font-normal text-left ${epilogue.className}`} >
        <Navbar />
        <main className="flex flex-col items-center justify-center w-full overflow-x-clip">
          {children}
        </main>
          <Footer />
      </body>
    </html>
  );
}
