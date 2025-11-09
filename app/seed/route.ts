import bcrypt from 'bcrypt'
import postgres from 'postgres'
import { blogs } from '../lib/placeholder-data'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

async function seedBlogs() {
    await sql`CREATE EXTENSION IF NOT EXISTS 'uuid-ossp'`

    await sql`
        CREATE TABLE IF NOT EXISTS blogs (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL
        )
    `

    const insertedBlogs = await Promise.all(
        blogs.map(
            (blog) => sql`
                INSERT INTO blogs (id, title, description)
                VALUES (${blog.id}, ${blog.title}, ${blog.description})
                ON CONFLICT (id) DO NOTHING;
            `
        )
    )

    return insertedBlogs
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedBlogs(),
        ])

        return Response.json({ message: 'Database seeded successfully'})
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}