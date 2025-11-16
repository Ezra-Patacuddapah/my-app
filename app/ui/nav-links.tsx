'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    {
        name: 'Home', href: '/',
    },
    {
        name: 'Admin', href: '/admin',
    },
]

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
            <div className="flex justify-center items-center w-50 gap-1 fixed bottom-1 md:bottom-5 left-1 z-20">
                {links.map(link => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                'flex w-auto grow bg-gray-600 items-center justify-center gap-2 rounded-md py-1 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:px-3',
                                {
                                    'bg-sky-100 text-blue-600': pathname === link.href,
                                    'hidden': pathname === '/admin' || pathname === '/login' || pathname === '/admin/create' || pathname === '/admin/update',
                                },
                            )}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </div>
        </>
    )
}