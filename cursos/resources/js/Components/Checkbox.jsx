export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "  border-gray-300 text-[#6b1e6f] shadow-sm focus:ring-[#6b1e6f] " +
                className
            }
        />
    );
}
