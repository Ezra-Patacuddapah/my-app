'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce'

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className="flex justify-center items-center mt-1">
            <input
                onChange={e => {handleSearch(e.target.value)}}
                defaultValue={searchParams.get('query')?.toString()}
                placeholder={placeholder}
                className='p-2 w-70 md:w-100 border border-white rounded-md md:text-xl my-1'
                autoFocus
            />
        </div>
    )
}