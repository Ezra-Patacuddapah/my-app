import postgres from 'postgres'
import { texts, admins } from '../lib/placeholder-data'
import bcrypt from 'bcrypt'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

async function seedAdmins() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    await sql`
        CREATE TABLE IF NOT EXISTS admins (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            password TEXT NOT NULL
        )
    `

    const insertedAdmins = await Promise.all(
        admins.map(
            async admin => {
                const hashedPassword = await bcrypt.hash(admin.password, 10)
                return sql`
                    INSERT INTO admins (id, name, password)
                    VALUES (${admin.id}, ${admin.name}, ${hashedPassword})
                    ON CONFLICT (id) DO NOTHING
                `
            }
        )
    )

    return insertedAdmins
}

async function seedTexts() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    await sql`
        CREATE TABLE IF NOT EXISTS texts (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            text VARCHAR(255) NOT NULL
        )
    `

    const insertedTexts = await Promise.all(
        texts.map(
            (text) => sql`
                INSERT INTO texts (id, text)
                VALUES (${text.id}, ${text.text})
                ON CONFLICT (id) DO NOTHING;
            `
        )
    )

    return insertedTexts
}

export async function GET() {
    try {
        await sql.begin((sql) => [
            seedTexts(),
            seedAdmins(),
        ])

        return Response.json({ message: 'Database seeded successfully'})
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}