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
                <input type="text" name="text" id="text" className='py-1 pl-2 border border-white rounded-md mr-1'
                    aria-describedby="text-error" autoFocus
                />
                <Button className='mx-1' type="submit">
                    <Link
                        href='/admin'
                    >
                        Cancel
                    </Link>
                </Button>
                <Button type="submit" className=''>Save</Button>
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
