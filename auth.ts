import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { Admin } from "@/app/lib/definitions.ts";
import bcrypt from 'bcrypt'
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

async function getAdmin(name: string): Promise<Admin | undefined> {
    try {
        const admin = await sql<Admin[]>`SELECT * FROM admins WHERE name=${name}`
        return admin[0]
    } catch (error) {
        console.error('Failed to fetch admin:', error)
        throw new Error('Failed to fetch admin.')
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ name: z.string().min(1), password: z.string().min(6) })
                .safeParse(credentials)

            if (parsedCredentials.success) {
                const { name, password } = parsedCredentials.data
                const admin = await getAdmin(name)
                if (!admin) return null
                const passwordsMatch = await bcrypt.compare(password, admin.password)

                if (passwordsMatch) return admin
            }

            console.log('Invalid credentials')
            return null
        },
    }),],
})