'use client'

import { createText, State } from "@/app/lib/actions"
import { useActionState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import Cancel from "./cancel"

export default function Form() {
    const initialState: State = { message: null, errors: {} }
    const [state, formAction] = useActionState(createText, initialState)
    return (
        <>
            <form action={formAction} className='flex justify-center items-center mt-10'>
                <input type="text" name="text" id="text" className='py-1 pl-2 border border-blue-300 rounded-md mr-1'
                    aria-describedby="text-error" autoFocus placeholder="Create"
                />
                <button type="submit" className="md:flex md:justify-center md:items-center md:bg-gray-700 md:px-2 md:py-1 md:rounded-md">
                    <PaperAirplaneIcon className='w-6 h-6 text-blue-400 animate-pulse md:mr-1' />
                    <p className="hidden md:block md:text-xl">Send</p>
                </button>
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
            <Cancel />
        </>
        
    )
}
