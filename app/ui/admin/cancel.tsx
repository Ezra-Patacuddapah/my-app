import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";

// export default function Cancel() {
//     return (
//         <Link
//             href='/admin'
//         >
//             <button type="button">
//                     <XMarkIcon className='w-6 h-6 mt-2 mr-1 text-blue-400 fixed top-1 right-1' />
//             </button>
//         </Link>
//     )
// }

export function CancelAdmin() {
    return (
        <Link
            href='/'
        >
            <button type="button">
                    <XMarkIcon className='w-6 h-6 md:w-8 md:h-8 mt-2 mr-1 text-blue-400 fixed top-1 right-1 cursor-pointer md:border border-blue-400 rounded-full' />
            </button>
        </Link>
    )
}

export default function CancelPage() {
    return (
        <Link
            href="#"
            onClick={e => {
                e.preventDefault()
                window.history.back()
            }}
        >
            <button type="button">
                    <XMarkIcon className='w-6 h-6 md:w-8 md:h-8 mt-2 mr-1 text-blue-400 fixed top-1 right-1 cursor-pointer md:border border-blue-400 rounded-full' />
            </button>
        </Link>
    )
}