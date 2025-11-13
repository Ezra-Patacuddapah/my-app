import { Metadata } from 'next'
import Table from '../ui/admin/table'
import { Create } from '../ui/admin/buttons'
import Search from '../ui/search'
import { fetchTextsPages } from '@/app/lib/data'
import Pagination from '../ui/admin/pagination'

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
            <Table query={query} currentPage={currentPage} />
            <Pagination totalPages={totalPages} />
        </div>
    )
}