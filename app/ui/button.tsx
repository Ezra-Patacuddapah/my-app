interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={`bg-gray-600 rounded-md py-1 px-2 m-1 ${className}`}
        >
            {children}
        </button>
    )
}