'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { generatePagination } from '@/app/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const allPages = generatePagination(currentPage, totalPages)

    return (
        <>
            <div className='flex justify-center items-center md:fixed bottom-10 left-0 right-0 pb-15'>
                <PaginationNav
                    direction='left'
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />
            

                <div className='flex -space-x-px'>
                    {allPages.map((page, index) => {
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined

                        if (index === 0) position = 'first'
                        if (index === allPages.length - 1) position = 'last'
                        if (allPages.length === 1) position = 'single'
                        if (page === '...') position = 'middle'

                        return (
                            <PaginationNumber
                                key={`${page}-${index}`}
                                href={createPageURL(page)}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                            />
                        )
                    })}
                </div>

            
                <PaginationNav
                    direction='right'
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </>
    )
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    isActive: boolean;
    position?: 'first' | 'last' | 'middle' | 'single';
}) {
    const className = clsx(
        'flex w-10 h-10 justify-center items-center text-sm bg-gray-600 border',
        {
            'rounded-l-md': position === 'first' || position === 'single',
            'rounded-r-md': position === 'last' || position === 'single',
            'z-10 bg-gray-900 text-white': isActive,
            'hover:bg-gray-800': !isActive && position !== 'middle',
            'text-gray-300': position === 'middle',
        }
    )

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    )
}

function PaginationNav ({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: 'left' | 'right';
    isDisabled: boolean;
}) {
    const className = clsx(
        'flex py-1 px-2 justify-center items-center rounded-md bg-gray-600',
        {
            'pointer-events-none invisible': isDisabled,
            'hover:bg-gray-900': !isDisabled,
            'mr-2 md:mr-4': direction === 'left',
            'ml-2 md:ml-4': direction === 'right',
        }
    )

    const navBtn = 
        direction === 'left' ? (
            <button>Left</button>
        ) : (
            <button>Right</button>
        )

    return isDisabled ? (
        <div className={className}>{navBtn}</div>
    ) : (
        <Link href={href} className={className}>
            {navBtn}
        </Link>
    )
}
