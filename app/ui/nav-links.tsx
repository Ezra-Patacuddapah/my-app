'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

const links = [
    {
        name: <HomeIcon className="w-5 h-5" />, href: '/', id: 1,
    },
    {
        name: <ArrowRightEndOnRectangleIcon className="w-7 h-7 fixed right-4 bottom-4 text-blue-400 animate-pulse" />, href: '/admin', id: 2,
    },
]

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
            <div className="flex justify-center items-center gap-1 fixed bottom-5 md:bottom-5 left-5 z-20">
                {links.map(link => {
                    return (
                        <Link
                            key={link.id}
                            href={link.href}
                            >
                            <button 
                                className={clsx(
                                    'flex w-auto items-center justify-between hover:bg-sky-100 hover:text-blue-600 rounded-sm',
                                    {
                                        'bg-sky-100 text-blue-600': pathname === link.href,
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