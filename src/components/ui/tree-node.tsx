import { useRef, useEffect } from "react";
import type { TreeNodeProps } from "../../types";
import DownChevron from "./down-chevron";
import RightChevron from "./right-chevron";
import FileIcon from "./file-icon";
import FolderIcon from "./folder-icon";
import FileTree from "./file-tree";

export function TreeNode({ node, depth, expanded, setExpanded, selectedId, setSelectedId, focusedId, setFocusedId, showProperties, setShowProperties }: TreeNodeProps) {
  const isFolder = node.type === "folder";
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  // Ref used to sync keyboard focus with DOM focus
  const ref = useRef<HTMLButtonElement | null>(null);

  // Toggle folder open/close
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

  // When focus changes via keyboard navigation,
  // move actual DOM focus to this node
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
          // Clicking resets keyboard focus state
          setFocusedId(null);
          if (isFolder) toggle();
          // Selection is explicit (click or Enter)
          setSelectedId(node.id);

          // Only open modal on small screens
          if (window.innerWidth < 640) {
            setShowProperties(true);
          }
        }}
        className={`
          flex items-center gap-2 px-2 py-1 w-full cursor-pointer rounded-md
          border-2 transition-all duration-200 ease-in-out outline-none

          ${isSelected ? "bg-brand-primary-container border-brand-primary text-brand-on-primary-container font-semibold" : isFocused ? "border-brand-primary" : "border-transparent hover:bg-brand-secondary-container hover:text-brand-secondary"}
        `}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {/* Expand/collapse + file/folder icons */}
        <div className="flex items-center">
          <div className="w-5 flex-shrink-0 flex items-center justify-center">{isFolder ? isExpanded ? <DownChevron /> : <RightChevron /> : <div className="w-5" />}</div>
          <div className="flex-shrink-0 flex items-center">{isFolder ? <FolderIcon /> : <FileIcon color="text-brand-outline" />}</div>
        </div>

        {/* Node label plus size */}
        <div className="flex items-center justify-between w-full">
          <span className="truncate text-brand-on-surface text-body-md">{node.name}</span>
          <span className="text-brand-outline text-body-sm">{node.size}</span>
        </div>
      </button>

      {/* Render children only when expanded */}
      {isFolder && isExpanded && node.children && (
        <FileTree data={node.children} depth={depth + 1} expanded={expanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} focusedId={focusedId} setFocusedId={setFocusedId} showProperties={showProperties} setShowProperties={setShowProperties} />
      )}
    </li>
  );
}
