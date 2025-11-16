'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import postgres from 'postgres'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const FormSchema = z.object({
    id: z.string(),
    text: z.string().min(1, "Please enter text."),
})

const CreateText = FormSchema.omit({ id: true })
const UpdateText = FormSchema.omit({ id: true })

export type State = {
    errors?: {
        text?: string[];
    };
    message?: null | string;
}

export async function createText(prevState: State, formData: FormData) {
    const validatedField = CreateText.safeParse({
        text: formData.get('text')
    })

    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing Field. Failed to create text.',
        }
    }

    const { text } = validatedField.data

    try {
        await sql`
            INSERT INTO texts (text)
            VALUES (${text})
        `
    } catch (error) {
        console.error(error)
        return {
            message: 'Database Error: Failed to Create Text.',
        }
    }

    revalidatePath('/')
    revalidatePath('/admin')
    redirect('/admin')
}

export async function updateText(id: string, prevState: State, formData: FormData) {
    const validatedField = UpdateText.safeParse({
        text: formData.get('text'),
    })

    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Missing Field. Failed to Update Text.'
        }
    }

    const { text } = validatedField.data

    try {
        await sql`
            UPDATE texts
            SET text = ${text}
            WHERE id = ${id}
        `
    } catch (error) {
        console.error(error)
        return {
            message: 'Database Error: Failed to Update Text.'
        }
    }

    revalidatePath('/')
    revalidatePath('/admin')
    redirect('/admin')
}

export async function deleteText(id: string) {
    await sql`DELETE FROM texts WHERE id=${id}`
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}
