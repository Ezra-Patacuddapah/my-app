import Form from '@/app/ui/admin/update-form'
import { fetchTextById } from '@/app/lib/data'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Update Text',
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = params.id
    const text = await fetchTextById(id) // if many Promise.all([fetchTextById(id), fetchProducts(),]) and destructure in it in an array

    if (!text) {
        notFound()
    }
    return (
        <main>
            <Form text={text} />
        </main>
    )
}