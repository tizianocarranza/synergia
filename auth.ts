import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from "@/app/lib/data/read";
import bcrypt from "bcrypt";
import { z } from "zod";

/* However, you will need to create a separate file for the bcrypt package. This is because bcrypt relies on Node.js APIs not available in Next.js Middleware. */
const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password should have at least 8 characters."),
});



export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = signInSchema.safeParse(credentials);

                if (parsedCredentials.success) {

                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);

                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) return user;
                }
                console.log("Invalid credentials");
                return null;
            }
        })]
})