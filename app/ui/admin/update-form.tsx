'use client'

import { updateText, State } from '@/app/lib/actions'
import { Text } from '@/app/lib/definitions'
import { useActionState, useState, useRef } from 'react'

import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid'
import CancelPage from './cancel'

export default function UpdateTextForm({ text }: { text: Text} ) {
    const initialState: State = { message: null, errors: {} }
    const updateTextWithId = updateText.bind(null, text.id)
    const [state, formAction] = useActionState(updateTextWithId, initialState)
    const [inputValue, setInputValue] = useState(text.text || '')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClear = () => {
        setInputValue('')
        inputRef.current?.focus()
    }

    return (
        <>
            <form action={formAction} className='flex justify-center items-center mt-10'>
                <div className='relative'>
                    <input type="text" name="text" id="text" 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)}
                    ref={inputRef} 
                    className='py-1 pl-2 mr-1 border border-blue-300 rounded-md' 
                        autoFocus placeholder='Update'
                    />
                    {inputValue && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-100 hover:text-gray-100 cursor-pointer"
                            aria-label="Clear input"
                        >
                            <XMarkIcon className="w-5 h-5 bg-gray-800" />
                        </button>
                    )}
                </div>
                
                <button type="submit" className="md:flex md:justify-center md:items-center md:bg-gray-700 md:px-2 md:py-1 md:rounded-md">
                    <PaperAirplaneIcon className='w-6 h-6 text-blue-400 animate-pulse md:mr-1' />
                    <p className="hidden md:block md:text-xl">Send</p>
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
            <CancelPage />
        </>
    )
}