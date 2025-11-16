import { Metadata } from 'next'
import Table from '../ui/admin/table'
import { Create } from '../ui/admin/buttons'
import Search from '../ui/search'
import { fetchTextsPages } from '@/app/lib/data'
import Pagination from '../ui/admin/pagination'
import { Suspense } from 'react'
import { TextsTableSkeleton } from '../ui/skeltetons'
import SignOut from '../ui/admin/sign-out'

export const metadata: Metadata = {
    title: "Admin"
}

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const totalPages = await fetchTextsPages(query)

    return (
        <div>
            <Create />
            <Search placeholder='Search...'/>
            <Suspense key={query + currentPage} fallback={<TextsTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <Pagination totalPages={totalPages} />
            <div className='fixed left-5 bottom-5'>
                <SignOut />
            </div>
        </div>
    )
}