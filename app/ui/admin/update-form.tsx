'use client'

import { updateText, State } from '@/app/lib/actions'
import { Text } from '@/app/lib/definitions'
import Link from 'next/link'
import { useActionState } from 'react'
import { PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/solid'

export default function UpdateTextForm({ text }: { text: Text} ) {
    const initialState: State = { message: null, errors: {} }
    const updateTextWithId = updateText.bind(null, text.id)
    const [state, formAction] = useActionState(updateTextWithId, initialState)

    return (
        <>
            <form action={formAction} className='flex justify-center items-center mt-2'>
                <Link
                    href='/admin'
                >
                    <button type="button">
                            <XCircleIcon className='w-6 h-6 mt-2 mr-1' />
                    </button>
                </Link>
                <input type="text" name="text" id="text" defaultValue={text.text} className='py-1 pl-2 mr-1 border border-white rounded-md' 
                    autoFocus placeholder='Update'
                />
                <button type="submit">
                    <PaperAirplaneIcon className='w-5 h-5' />
                </button>
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