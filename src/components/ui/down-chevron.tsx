import { FaChevronDown } from "react-icons/fa";

export default function DownChevron({ color = "text-brand-outline" }: { color?: string }): React.ReactElement {
    return (
        <FaChevronDown className={`shrink-0 text-title-sm ${color}`} />
    )
}
