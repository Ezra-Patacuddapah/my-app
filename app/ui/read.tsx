import Link from "next/link"

export function Read({ id }: { id: string }) {
    return (
        <Link
            href={`/${id}/read`}
        >
        </Link>
    )
}