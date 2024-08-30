import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      type: "professional" | "organization";
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    type: "professional" | "organization";
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    type: "professional" | "organization";
    image?: string | null;
  }
}
