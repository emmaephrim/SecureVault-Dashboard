import { FaRegFolder } from "react-icons/fa";

export default function FolderIcon({ color = "text-brand-primary" }: { color?: string }): React.ReactElement {
  return <FaRegFolder className={`shrink-0 text-title-md ${color} ml-1`} />;
}
