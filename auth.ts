import type { User } from "@/app/lib/placeholder-data";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { z } from "zod";
import { authConfig } from "./auth.config";

const cookieStore = cookies();

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            cookieStore.set("userEmail", email, {
              path: "/",
              sameSite: "lax",
            });

            cookieStore.set("userId", user.id, {
              path: "/",
              sameSite: "lax",
            });
            return user;
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  secret: "6AZ1sVVk6SV6eONap2iLBNr2vWGhcfhew7IkwaoUt20=",
});
