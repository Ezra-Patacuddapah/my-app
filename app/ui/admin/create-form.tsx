'use client'

import { createText, State } from "@/app/lib/actions"
import { useActionState, useState, useRef } from 'react'
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Cancel from "./cancel"

export default function Form() {
    const initialState: State = { message: null, errors: {} }
    const [state, formAction] = useActionState(createText, initialState)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClear = () => {
        setInputValue('')
        inputRef.current?.focus()
    }

    return (
        <>
            <form action={formAction} className='flex justify-center items-center mt-10'>
                <div className="relative">
                    <input type="text" name="text" id="text" className='py-1 pl-2 border border-blue-300 rounded-md mr-1'
                    aria-describedby="text-error" autoFocus placeholder="Sky"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    ref={inputRef}
                    />
                    {inputValue && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-100 hover:text-gray-100 cursor-pointer"
                            aria-label="Clear input"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
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
