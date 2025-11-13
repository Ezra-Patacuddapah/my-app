import Link from 'next/link'
import { deleteText } from '@/app/lib/actions'

export function Create() {
    return (
        <Link
            href="/admin/create"
            className='bg-gray-600 rounded-md py-1 px-2 m-1 fixed bottom-1 right-1'
        >
            Create
        </Link>
    )
}

export function Update({ id }: { id: string }) {
    return (
        <Link
            href={`/admin/${id}/update`}
            className="bg-gray-600 rounded-md py-1 px-2 m-1"
        >
            Update
        </Link>
    )
}

export function Delete({ id }: { id: string }) {
    const deleteTextWithId = deleteText.bind(null, id)
    return (
        <form action={deleteTextWithId}>
            <button type="submit" className='bg-gray-600 rounded-md py-1 px-2 m-1'>Delete</button>
        </form>
    )
}