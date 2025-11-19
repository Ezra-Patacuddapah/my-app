import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function Cancel() {
    return (
        <Link
            href='/admin'
        >
            <button type="button">
                    <XCircleIcon className='w-8 h-8 mt-2 mr-1 text-blue-400 fixed bottom-1 right-1' />
            </button>
        </Link>
    )
}