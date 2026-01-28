import '../../css/PrimaryButton.css';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`pink-button ${disabled && 'disabled'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
