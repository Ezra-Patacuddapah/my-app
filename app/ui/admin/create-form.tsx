'use client'

import { Button } from '@/app/ui/button'
import { createText, State } from "@/app/lib/actions"
import Link from 'next/link'
import { useActionState } from 'react'

export default function Form() {
    const initialState: State = { message: null, errors: {} }
    const [state, formAction] = useActionState(createText, initialState)
    return (
        <>
            <form action={formAction} className='flex justify-center items-center mt-2'>
                <input type="text" name="text" id="text" className='py-1 pl-2 border border-white rounded-l-md'
                    aria-describedby="text-error" autoFocus
                />
                <Link
                    href='/admin'
                    className='bg-gray-600 p-1 border-r-2 border-gray-900 pr-2'
                >
                    Cancel
                </Link>
                <Button type="submit">Create</Button>
            </form>
            <div id="text-error" aria-live='polite' aria-atomic='true'>
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
