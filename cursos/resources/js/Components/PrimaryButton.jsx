export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `primary-button focus:border-[#6b1e6f] focus:ring-2 focus:ring-[#6b1e6f] active:bg-gray-900 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
