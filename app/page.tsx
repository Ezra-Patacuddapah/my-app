import Table from "./ui/table"
import Search from "./ui/search"
import { fetchTextsPages } from "./lib/data";
import Pagination from "./ui/admin/pagination";
import { Suspense } from 'react'
import { TextsTableSkeleton } from './ui/skeltetons'


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
            <div className="fixed left-0 right-0 top-2">
                <Search placeholder="Search..." />
            </div>
            <div className="mt-15">
                <Suspense key={query + currentPage} fallback={<TextsTableSkeleton />}>
                    <Table query={query} currentPage={currentPage} />
                </Suspense>
            </div>
            <div className="fixed left-0 right-0 bottom-0">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}