import postgres from 'postgres'
import { Text } from './definitions'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

// export async function fetchTexts() {
//     try {
//         const data = await sql<Text[]>`
//             SELECT texts.id, texts.text
//             FROM texts
//             ORDER BY texts.id DESC
//         `
//         return data
//     } catch (error) {
//         console.error('Database Error:', error)
//         throw new Error('Failed to fetch the texts.')
//     }
// }

export async function fetchTextById(id: string) {
    try {
        const data = await sql<Text[]>`
            SELECT texts.id,
            texts.text
            FROM texts
            WHERE texts.id = ${id};
        `
        const text = data.map(text => ({
            ...text
        }))
        return text[0]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch text.')
    }
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredTexts(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        const data = await sql<Text[]>`
            SELECT
            texts.id,
            texts.text
            FROM texts
            WHERE 
            texts.text::text ILIKE ${`%${query}%`}
            ORDER BY texts.id DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `

        return data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch texts.')
    }
}

export async function fetchTextsPages(query: string) {
    try {
        const data = await sql`SELECT COUNT(*)
        FROM texts
        WHERE
        texts.text::text ILIKE ${`%${query}%`}
        `

        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
        return totalPages
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of texts.')
    }
}