'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const FormSchema = z.object({
    id: z.string(),
    text: z.string(),
})

const CreateText = FormSchema.omit({ id: true })
const UpdateText = FormSchema.omit({ id: true })

export type State = {
    errors?: {
        text?: string[];
    }
}

export async function createText(formData: FormData) {
    const { text } = CreateText.parse({
        text: formData.get('text')
    })

    await sql`
        INSERT INTO texts (text)
        VALUES (${text})
    `

    revalidatePath('/admin')
    revalidatePath('/')
    redirect('/admin')
}

export async function updateText(id: string, formData: FormData) {
    const { text } = UpdateText.parse({
        text: formData.get('text')
    })

    await sql`
        UPDATE texts
        SET text = ${text}
        WHERE id = ${id}
    `

    revalidatePath('/admin')
    revalidatePath('/')
    redirect('/admin')
}

export async function deleteText(id: string) {
    await sql`DELETE FROM texts WHERE id=${id}`
    revalidatePath('/admin')
    revalidatePath('/')
}
