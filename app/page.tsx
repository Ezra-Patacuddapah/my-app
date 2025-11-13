import Table from "./ui/table"
import Search from "./ui/search"
import { fetchTextsPages } from "./lib/data";
import Pagination from "./ui/admin/pagination";

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
            <Search placeholder="Search..." />
            <Table query={query} currentPage={currentPage} />
            <Pagination totalPages={totalPages} />
        </div>
    )
}