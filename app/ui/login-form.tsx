'use client'

import { Button } from "./button"
import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { authenticate } from "../lib/actions"

export default function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    )

    return (
        <form action={formAction}>
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                id="name"
                name="name"
                placeholder="Enter name"
                required
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
            />
            <input
                type="hidden"
                name="redirectTo"
                value={callbackUrl}
            />
            <Button aria-disabled={isPending}>Log in</Button>
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
        </form>
    )
}