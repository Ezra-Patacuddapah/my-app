'use client'

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { authenticate } from "../lib/actions"
import { UserIcon, KeyIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { CancelAdmin } from "./admin/cancel"

export default function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    )

    const inputStyles = "py-1 pl-2 border border-blue-300 rounded-md mb-1"

    return (
        <form 
            action={formAction}
            className="flex flex-col m-5 justify-center items-center"
        >
            <label htmlFor="name" className="my-1">
                <UserIcon className="w-5 h-5 text-gray-400" />
            </label>
            <input 
                type="text" 
                id="name"
                name="name"
                placeholder="Enter Name"
                required
                className={inputStyles}
            />
            <label htmlFor="password" className="my-1">
                <KeyIcon className="w-5 h-5 text-gray-400" />
            </label>
            <input 
                type="password" 
                id="password"
                name="password"
                placeholder="Enter Password"
                required
                minLength={6}
                className={inputStyles}
            />
            <input
                type="hidden"
                name="redirectTo"
                value={callbackUrl}
            />
            <div className="mt-1">
                <button aria-disabled={isPending} type="submit">
                        <PaperAirplaneIcon className="w-7 h-7 animate-pulse text-blue-400" />
                </button>
            </div>
            <div
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>
            <CancelAdmin />
        </form>
    )
}