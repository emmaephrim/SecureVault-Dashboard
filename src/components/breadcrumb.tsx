import { MdOutlineHome } from "react-icons/md";
import BreadcrumbItem from "./ui/breadcrumb-item";
import RightChevron from "./ui/right-chevron";
import type { Node, SetSelected } from "../types";

export default function Breadcrumb({ path, onNavigate, setQuery }: { path: Node[]; onNavigate: SetSelected; setQuery: (e: string) => void }): React.ReactElement {
  return (
    <>
      <div className="overflow-x-auto flex flex-row mt-4 items-center w-full whitespace-nowrap transition-all duration-200">
        <button
          onClick={() => {
            // Reset to root and clear any active search
            onNavigate(null);
            setQuery("");
          }}
          className="shrink-0 text-brand-outline text-title-md flex items-center flex-row hover:bg-brand-primary-container hover:text-brand-on-primary-container group py-1 px-2 border-brand-inverse-on-surface border-l-2"
        >
          <MdOutlineHome className="h-5 w-5 text-title-md text-brand-outline group-hover:text-brand-on-primary-container" />
          Root
        </button>
        {path.map((node: Node, index: number) => (
          <div key={index} className="flex items-center transition-all duration-200">
            <RightChevron />
            {/* Only folders are navigable in breadcrumb */}
            {node.type !== "file" && <BreadcrumbItem node={node} onNavigate={onNavigate} />}
            {/* Files are shown as the final, non-clickable item */}
            {node.type == "file" && <span className="shrink-0 text-brand-primary text-title-md px-2">{node.name}</span>}
          </div>
        ))}
      </div>
    </>
  );
}
