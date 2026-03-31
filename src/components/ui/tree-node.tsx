import { useRef, useEffect } from "react";
import type { TreeNodeProps } from "../../types";
import DownChevron from "./down-chevron";
import RightChevron from "./right-chevron";
import FileIcon from "./file-icon";
import FolderIcon from "./folder-icon";
import FileTree from "./file-tree";

export function TreeNode({ node, depth, expanded, setExpanded, selectedId, setSelectedId, focusedId }: TreeNodeProps) {
  const isFolder = node.type === "folder";
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  const ref = useRef<HTMLButtonElement | null>(null);

  const toggle = () => {
    if (!isFolder) return;

    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(node.id)) newSet.delete(node.id);
      else newSet.add(node.id);
      return newSet;
    });
  };

  const isFocused = focusedId === node.id;
  useEffect(() => {
    if (isFocused) {
      ref.current?.focus();
    }
  }, [isFocused]);

  return (
    <li>
      <button
        ref={ref}
        type="button"
        onClick={() => {
          if (isFolder) toggle();
          setSelectedId(node.id);
        }}
        className={`
  flex items-center gap-2 px-2 py-1 w-full cursor-pointer rounded-md
  border-2 transition-all duration-200 ease-in-out text-left

  focus-visible:ring-2 focus-visible:ring-brand-primary
  focus-visible:border-brand-primary

  ${isSelected ? "bg-brand-primary-container border-brand-primary text-brand-on-primary-container font-semibold" : isFocused ? "bg-brand-primary/20 border-brand-primary" : "border-transparent hover:bg-brand-on-secondary hover:text-brand-secondary"}
`}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {/* Icons */}
        <div className="flex items-center">
          <div className="w-5 flex-shrink-0 flex items-center justify-center">{isFolder ? isExpanded ? <DownChevron /> : <RightChevron /> : <div className="w-5" />}</div>

          <div className="flex-shrink-0 flex items-center">{isFolder ? <FolderIcon /> : <FileIcon color="text-brand-outline" />}</div>
        </div>

        {/* Name */}
        <div className="flex items-center justify-between w-full">
          <span className="truncate text-brand-on-surface text-body-md">{node.name}</span>
          <span className="text-brand-outline text-body-sm">{node.size}</span>
        </div>
      </button>

      {isFolder && isExpanded && node.children && <FileTree data={node.children} depth={depth + 1} expanded={expanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} focusedId={focusedId} />}
    </li>
  );
}
