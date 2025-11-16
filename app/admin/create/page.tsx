import Form from '@/app/ui/admin/create-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create Text',
}

export default function Page() {
    return (
        <main>
            <Form />
        </main>
    )
}