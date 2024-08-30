import type { NextAuthConfig, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
 
export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: User }) {
      {/* 
        This callback is called whenever a JSON Web Token is created (i.e. at sign in)
        or updated (i.e whenever a session is accessed in the client). 
        Anything you return here will be saved in the JWT and forwarded to the session callback. 
        There you can control what should be returned to the client. Anything else will be kept from your frontend. 
        The JWT is encrypted by default via your AUTH_SECRET environment variable. 
       */}

      if (user) {
        token.id = user.id ?? "";
        token.name = user.name ?? "";
        token.email = user.email ?? "";
        token.type = user.type ?? ""
      }
      return token;
    },


    async session({ session, token }: { session: Session, token: JWT }) {
      if(session.user) {
        {/* 
          This callback is called whenever a session is checked. (i.e. when invoking the /api/session endpoint, using useSession or getSession). The return value will be exposed to the client, so be careful what you return here! If you want to make anything available to the client which you've added to the token through the JWT callback, you have to explicitly return it here as well.
          :::note ⚠ By default, only a subset (email, name, image) of the token is returned for increased security. :::
          The token argument is only available when using the jwt session strategy, and the user argument is only available when using the database session strategy. 
        */}
        
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.type = token.type;
      }
      // Agrega más propiedades si es necesario
      return session;
    },


    authorized({ auth, request: { nextUrl } /* toma la nextUrl unicamente desestructurando el objeto request osea es lo mismo que tomar request y luego hacer: const nextUrl = request.nextUrl*/ }) {
        {/* 
          Invoked when a user needs authorization, using Middleware. 
          You can override this behavior by returning a NextResponse. 
        */}
      
      const isLoggedIn = !!auth?.user; /* Esto convierte auth?.user en un valor booleano. Si auth?.user está definido (es decir, el usuario está autenticado), isLoggedIn será true; de lo contrario, será false. */
        const isOnProfile = nextUrl.pathname.startsWith("/profile");
        const isOnInbox = nextUrl.pathname.startsWith("/inbox");
        const isOnAccount = nextUrl.pathname.startsWith("/account") || nextUrl.pathname.startsWith("/sign-in") || nextUrl.pathname.startsWith("/sign-up");

        if(isOnAccount) {
          if (isLoggedIn) return NextResponse.redirect(new URL(`/profile/me`, nextUrl));
          return true
        }
        
        if (isOnProfile || isOnInbox) {
            if(isLoggedIn) return true
            return NextResponse.redirect(new URL("/sign-in", nextUrl));; /* Si no esta logeado se redirige al user a la ruta definida de signIn ("sign-in") */
        }

        return true;
    },
  },
  providers: []

} satisfies NextAuthConfig;