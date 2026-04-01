import type { FileTreeProps } from "../../types";
import { TreeNode } from "./tree-node";

export default function FileTree({ data, depth = 0, expanded, setExpanded, selectedId, setSelectedId, focusedId, setFocusedId, showProperties, setShowProperties }: FileTreeProps) {
  return (
    <ul>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} depth={depth} expanded={expanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} focusedId={focusedId} setFocusedId={setFocusedId} showProperties={showProperties} setShowProperties={setShowProperties} />
      ))}
    </ul>
  );
}
