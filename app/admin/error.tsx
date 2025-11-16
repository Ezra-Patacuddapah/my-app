'use client'

import { useEffect } from "react"
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        // <main className="flex h-full flex-col items-center justify-center">
        //     <h2 className="text-center">Something went wrong!</h2>
        //     <button
        //         onClick={() => reset()}
        //     >
        //         Try again
        //     </button>
        // </main>
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>Could not find the requested text.</p>
            <Link
                href="/admin"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            >
                Go Back
            </Link>
        </main>
    )
}