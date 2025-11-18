'use client'

import Image from "next/image"

export default function Logo() {
    return (
        <Image src='/logo.png' className="w-5 h-5 animate-spin duration-[800ms] fixed top-1 left-1" alt="Ezra Logo" width={15} height={15} />
    )
}