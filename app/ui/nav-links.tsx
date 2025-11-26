'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

const links = [
    {
        name: <div className="md:flex md:justify-center md:items-center md:px-2 md:py-1 md:rounded-md"><HomeIcon className="w-5 h-5 md:w-8 md:h-8" /><p className="hidden md:block md:text-xl md:ml-1">Home</p></div>, href: '/', id: 1,
    },
    {
        name: <div className="md:flex md:justify-center md:items-center md:rounded-md fixed right-4 bottom-4 md:bg-gray-700 md:px-2 md:py-1 md:bottom-6"><ArrowRightEndOnRectangleIcon className="w-7 h-7 text-blue-400 animate-pulse md:w-9 md:h-9" /><p className="hidden md:block md:text-xl px-2 text-blue-400">Log In</p></div>, href: '/admin', id: 2,
    },
]

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
            <div className="flex justify-center items-center gap-1 fixed bottom-4 left-5 z-20">
                {links.map(link => {
                    return (
                        <Link
                            key={link.id}
                            href={link.href}
                            >
                            <button 
                                className={clsx(
                                    'flex w-auto items-center justify-between hover:bg-sky-100 hover:text-blue-600 rounded-sm md:rounded-md cursor-pointer',
                                    {
                                        'bg-sky-300 text-blue-800': pathname === link.href,
                                        'hidden': pathname !== '/',
                                    },
                                )}
                            >
                                {link.name}
                            </button>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}