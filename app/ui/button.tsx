interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={className}
            // className="bg-gray-600 py-1 px-2 rounded-r-md"
        >
            {children}
        </button>
    )
}