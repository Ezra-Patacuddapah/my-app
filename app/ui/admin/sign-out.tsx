import { signOut } from "@/auth";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function SignOut() {
    return (
            <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/'})
            }}
            >
                <button type="submit" className="text-yellow-400 cursor-pointer md:flex md:justify-center md:items-center md:bg-gray-700 md:px-2 md:py-1 md:rounded-md">
                    <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
                    <p className="hidden md:block md:text-xl md:ml-1">Sign Out</p>
                </button>
            </form>

    )
}
