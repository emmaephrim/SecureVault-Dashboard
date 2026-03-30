import { FaChevronRight } from "react-icons/fa";


export default function RightChevron({ color = 'text-brand-outline' }: { color?: string }) {
    return (
        <FaChevronRight className={`shrink-0 text-title-sm ${color}`} />
    )
}
