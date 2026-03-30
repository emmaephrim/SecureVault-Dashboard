import { FaRegFile } from "react-icons/fa";

export default function FileIcon({ color = "text-brand-primary" }: { color?: string, }): React.ReactElement {
    return (
        <FaRegFile className={`shrink-0 text-title-sm ${color}`} />
    )
}
