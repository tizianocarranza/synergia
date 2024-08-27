import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
 
export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } /* toma la nextUrl unicamente desestructurando el objeto request osea es lo mismo que tomar request y luego hacer: const nextUrl = request.nextUrl*/ }) {
        const isLoggedIn = !!auth?.user; /* Esto convierte auth?.user en un valor booleano. Si auth?.user está definido (es decir, el usuario está autenticado), isLoggedIn será true; de lo contrario, será false. */
        const isOnProfile = nextUrl.pathname.startsWith("/profile");
        const isOnInbox = nextUrl.pathname.startsWith("/inbox");
        const isOnAccount = nextUrl.pathname.startsWith("/account") || nextUrl.pathname.startsWith("/sign-in") || nextUrl.pathname.startsWith("/sign-up")

        if(isOnAccount) {
          if (isLoggedIn) return NextResponse.redirect(new URL("/profile", nextUrl));
          return true
        }
        
        if (isOnProfile || isOnInbox) {
            if(isLoggedIn) return true
            return NextResponse.redirect(new URL("/sign-in", nextUrl));; /* Si no esta logeado se redirige al user a la ruta definida de signIn ("sign-in") */
        }

        return true;
    }
  },
  providers: []

} satisfies NextAuthConfig;