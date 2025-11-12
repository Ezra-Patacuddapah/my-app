'use client'

import { Button } from '@/app/ui/button'
import { createText } from "@/app/lib/actions"

export default function Form() {
    return (
        <form action={createText} className='flex justify-center items-center'>
            <input type="text" name="text" id="text" className='pl-2 border border-white rounded-l-md' />
            <Button type="submit">Create</Button>
        </form>
    )
}
