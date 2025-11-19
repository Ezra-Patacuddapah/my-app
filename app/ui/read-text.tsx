'use client'

import { Text } from '@/app/lib/definitions'
import { CancelAdmin } from './admin/cancel'

export default function ReadText({ text }: { text: Text} ) {

    return (
        <>
            <div>
                <p className='text-6xl text-shadow-white mt-30'>{text.text}</p>
            </div>
            <CancelAdmin />
        </>
    )
}