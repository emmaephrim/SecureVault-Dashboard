import { FaRegFolder } from "react-icons/fa6";

export default function FolderIcon({ color = "text-brand-primary" }: { color?: string }): React.ReactElement {
  return <FaRegFolder className={`shrink-0 text-title-md w-5 h-5 group-hover:text-brand-inverse-surface ${color} ml-2`} />;
}
