import { signOut } from "@/auth";

export default function SignOut() {
    return (
            <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/'})
            }}
            >
                <button className="bg-gray-600 rounded-md py-1 px-2 m-1">Sign Out</button>
            </form>

    )
}
