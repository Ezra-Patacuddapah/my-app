'use client'

import { Button } from '../button'
import { updateText, State } from '@/app/lib/actions'
import { Text } from '@/app/lib/definitions'
import Link from 'next/link'
import { useActionState } from 'react'

export default function UpdateTextForm({ text }: { text: Text} ) {
    const initialState: State = { message: null, errors: {} }
    const updateTextWithId = updateText.bind(null, text.id)
    const [state, formAction] = useActionState(updateTextWithId, initialState)

    return (
        <>
            <form action={formAction} className='flex justify-center items-center mt-2'>
                <input type="text" name="text" id="text" defaultValue={text.text} className='py-1 pl-2 border border-white rounded-l-md' 
                    autoFocus
                />
                <Link
                    href='/admin'
                    className='bg-gray-600 p-1 border-r-2 border-gray-900 pr-2'
                >
                    Cancel
                </Link>
                <Button type="submit">Update</Button>
            </form>
            <div id="text-error" aria-live='polite' aria-atomic='true' className='flex-inline'>
                {state.errors?.text &&
                    state.errors.text.map((error: string) => (
                        <p className='mt-2 text-sm text-red-400 text-center' key={error}>
                            {error}
                        </p>
                    ))
                }
            </div>
        </>
    )
}