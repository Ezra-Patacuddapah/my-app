'use client'

import Image from "next/image"

export default function Logo() {
    return (
        <Image src='/favicon.ico' className="w-6 h-6 md:w-10 md:h-10 animate-spin duration-[800ms] fixed top-1 left-1" alt="Ezra Logo" width={15} height={15} />
    )
}