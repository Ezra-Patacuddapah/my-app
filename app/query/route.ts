import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

async function listBlogs() {
    const data = await sql`
        SELECT blogs.title, blogs.description
        FROM blogs
    `

    return data
}

export async function GET() {
    try {
        return Response.json(await listBlogs())
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}