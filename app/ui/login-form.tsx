'use client'

import { useActionState, useState } from "react"
import { useSearchParams } from "next/navigation"
import { authenticate } from "../lib/actions"
import { UserIcon, KeyIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { CancelAdmin } from "./admin/cancel"

export default function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    )
    const [name, setName] = useState("Admin")
    const [password, setPassword] = useState("123456")

    const inputStyles = "py-1 pl-2 border border-blue-300 rounded-md mb-1"

    const handleSubmit = async (formData: FormData) => {
        formData.set('name', name)
        formData.set('password', password)

        const result = await authenticate(undefined, formData)
        return result
    }

    const clearName = () => setName("")
    const clearPassword = () => setPassword("")

    return (
        <form 
            action={formAction}
            className="flex flex-col m-5 justify-center items-center"
        >
            <label htmlFor="name" className="my-1 flex">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <span className="hidden md:block ml-1">Name</span>
            </label>
            <div className="relative">
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Admin"
                    required
                    className={inputStyles}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {name && (
                    <button
                        type="button"
                        onClick={clearName}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-100 hover:text-gray-300 cursor-pointer"
                        aria-label="Clear name"
                    >
                        <XMarkIcon className="w-5 h-5 bg-gray-800" />
                    </button>
                )}
            </div>
            
            <label htmlFor="password" className="my-1 flex">
                <KeyIcon className="w-5 h-5 text-gray-400" />
                <span className="hidden md:block ml-2">Password</span>
            </label>
            <div className="relative">
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    placeholder="123456"
                    required
                    minLength={6}
                    className={inputStyles}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {password && (
                    <button
                        type="button"
                        onClick={clearPassword}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-100 hover:text-gray-300 cursor-pointer"
                        aria-label="Clear password"
                    >
                        <XMarkIcon className="w-5 h-5 bg-gray-800" />
                    </button>
                )}
            </div>

            
            <input
                type="hidden"
                name="redirectTo"
                value={callbackUrl}
            />
            <div className="mt-1">
                <button aria-disabled={isPending} type="submit" className="cursor-pointer md:flex md:justify-center md:items-center md:bg-gray-700 md:px-2 md:py-1 md:rounded-md">
                        <PaperAirplaneIcon className="w-7 h-7 animate-pulse text-blue-400" />
                        <span className="hidden md:block md:text-xl ml-2">Send</span>
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