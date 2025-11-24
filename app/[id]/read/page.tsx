import ReadText from '@/app/ui/read-text'
import { fetchTextById } from '@/app/lib/data'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Read Text',
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = params.id
    const text = await fetchTextById(id)

    if (!text) {
        notFound()
    }
    return (
        <main>
            <div className='flex justify-center w-screen h-screen text-shadow-lg/100'>
                <ReadText text={text} />
            </div>
        </main>
    )
}