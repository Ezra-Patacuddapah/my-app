'use client'

import Image from "next/image"

export default function Logo() {
    return (
        <Image src='/gear.png' className="bg-gray-600 animate-spin duration-[800ms] fixed top-0 left-0" alt="Ezra Logo" width={15} height={15} />
    )
}