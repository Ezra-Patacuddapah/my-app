import Link from 'next/link'
import { deleteText } from '@/app/lib/actions'
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

const className = 'text-blue-400'

export function Create() {
    return (
        <Link
            href="/admin/create"
        >
            <button
                type='submit'
                className='fixed bottom-4 right-4 md:flex md:justify-center md:items-center md:bg-gray-700 md:px-2 md:py-1 md:rounded-md'
            >
                <PlusCircleIcon className={`w-8 h-8 md:w-12 md:h-12 ${className} animate-pulse`} />
                <p className="hidden md:block md:text-xl md:ml-1">Create</p>
            </button>
        </Link>
    )
}

export function Update({ id }: { id: string }) {
    return (
        <Link
            href={`/admin/${id}/update`}
        >
            <button 
                type='submit'
                className='md:flex md:justify-center md:items-center md:bg-gray-700 md:px-2 md:py-1 md:rounded-md'
            >
                <PencilSquareIcon className={`w-5 h-5 ${className}`} />
                <p className="hidden md:block md:ml-1">Update</p>
            </button>
        </Link>
    )
}

export function Delete({ id }: { id: string }) {
    const deleteTextWithId = deleteText.bind(null, id)
    return (
        <form action={deleteTextWithId}>
            <button 
                type='submit'
                className='md:flex md:justify-center md:items-center md:bg-gray-700 md:px-2 md:py-1 md:rounded-md'
            >
                <TrashIcon className='w-5 h-5 text-red-400' />
                <p className="hidden md:block md:ml-1">Delete</p>
            </button>
        </form>
    )
}