import { signOut } from "@/auth";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function SignOut() {
    return (
            <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/'})
            }}
            >
                <button type="submit" className="text-yellow-400">
                    <LockClosedIcon className="w-6 h-6" />
                </button>
            </form>

    )
}
