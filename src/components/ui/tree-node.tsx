import type { TreeNodeProps } from "../../types";
import DownChevron from "./down-chevron";
import RightChevron from "./right-chevron";
import FileIcon from "./file-icon";
import FolderIcon from "./folder-icon";
import FileTree from "./file-tree";

export function TreeNode({ node, depth, expanded, setExpanded, selectedId, setSelectedId }: TreeNodeProps) {
  //   const [expanded, setExpanded] = useState<Set<string>>(new Set());
  //   const [selected, setSelected] = useState<string | null>(null);

  const isFolder = node.type === "folder";
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  const toggle = () => {
    if (!isFolder) return;
    const newSet = new Set(expanded);
    if (newSet.has(node.id)) newSet.delete(node.id);
    else newSet.add(node.id);
    setExpanded(newSet);
  };

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          if (isFolder) toggle();
          setSelectedId(node.id);
        }}
        className={`
        flex items-center gap-2 px-2 py-1 w-full cursor-pointer rounded-md border-2 border-transparent
        transition-all outline-none text-left
       focus:bg-brand-primary-container
        focus:text-brand-on-primary-container
        focus:border-brand-primary
        hover:bg-brand-primary-container
        ${isSelected ? "bg-brand-primary-container font-semibold" : ""}
      `}
        style={{ paddingLeft: `${depth * 16}px` }}
        onBlur={() => setSelectedId(null)}
      >
        {/* Icons */}
        <div className="flex-shrink-0 flex items-center">
          {isFolder ? isExpanded ? <DownChevron /> : <RightChevron /> : <FileIcon />}
          {isFolder && <FolderIcon />}
        </div>

        {/* Name */}
        <div className="flex items-center justify-between w-full">
          <span className="truncate text-brand-on-surface text-body-md">{node.name}</span>
          <span className="text-brand-outline text-body-sm">{node.size}</span>
        </div>
      </button>

      {isFolder && isExpanded && node.children && <FileTree data={node.children} depth={depth + 1} expanded={expanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} />}
    </li>
  );
}
