import type { HandleKeyParams, Node } from "./types";

// Build a quick lookup map (id -> node)
// Avoids repeatedly traversing the tree when we need a node
export function buildNodeMap(data: Node[]): Map<string, Node> {
  const map = new Map<string, Node>();

  function traverse(nodes: Node[]) {
    for (const node of nodes) {
      map.set(node.id, node);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  }

  traverse(data);
  return map;
}

// Build a parent lookup map (nodeId -> parentId | null) for quick upward traversal in the tree
// Used for breadcrumb plus sibling calculations
export function buildParentMap(data: Node[]) {
  const parentMap = new Map<string, string | null>();
  function traverse(nodes: Node[], parent: string | null) {
    for (const node of nodes) {
      parentMap.set(node.id, parent);
      if (node.children) traverse(node.children, node.id);
    }
  }
  traverse(data, null);
  return parentMap;
}

// Build breadcrumb path from selected node up to root
export function getPath(selectedId: string | null, parentMap: Map<string, string | null>, nodeMap: Map<string, Node>) {
  if (!selectedId) return [];

  const path = [];
  let current: string | null = selectedId;

  // Walk up the tree until we hit root
  while (current) {
    const node = nodeMap.get(current);
    if (!node) break;
    path.unshift(node); // prepend so order is root -> current
    current = parentMap.get(current) ?? null;
  }

  return path;
}

// Filters tree recursively while keeping structure intact
// Also collects which folders should be auto-expanded
export function filterTree(nodes: Node[], query: string, expandedSet: Set<string>): Node[] {
  if (!query) return nodes;

  const lowerQuery = query.toLowerCase();

  return nodes
    .map((node): Node | null => {
      // Ifi direct match, include node
      if (node.name.toLowerCase().includes(lowerQuery)) {
        if (node.type === "folder") {
          expandedSet.add(node.id); // open matching folders
        }
        return node;
      }

      // Otherwise, check children
      if (node.children) {
        const filteredChildren = filterTree(node.children, query, expandedSet);
        // If any child matches, keep parent
        if (filteredChildren.length > 0) {
          expandedSet.add(node.id);
          return { ...node, children: filteredChildren };
        }
      }

      return null;
    })
    .filter((node): node is Node => node !== null);
}

// Flatten visible nodes for keyboard navigation
// Only includes nodes that are currently visible (respecting expansion)
export function flattenVisible(nodes: Node[], expanded: Set<string>): Node[] {
  const result: Node[] = [];

  function traverse(list: Node[]) {
    for (const node of list) {
      result.push(node);

      if (node.type === "folder" && expanded.has(node.id)) {
        traverse(node.children || []);
      }
    }
  }

  traverse(nodes);
  return result;
}

// Basic keyboard navigation (similar to file explorers)
export function handleKey({ e, visibleNodes, focusedId, setFocusedId, setExpanded, setSelectedId, setShowProperties }: HandleKeyParams) {
  if (!visibleNodes.length) return;
  const currentIndex = visibleNodes.findIndex((n) => n.id === focusedId);

  // Move focus down
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const next = currentIndex === -1 ? visibleNodes[0] : visibleNodes[(currentIndex + 1) % visibleNodes.length];
    if (next) setFocusedId(next.id);
  }

  // Move focus up
  if (e.key === "ArrowUp") {
    e.preventDefault();
    const prev = currentIndex === -1 ? visibleNodes.at(-1) : visibleNodes[(currentIndex - 1 + visibleNodes.length) % visibleNodes.length];
    if (prev) setFocusedId(prev.id);
  }

  // Expand folder
  if (e.key === "ArrowRight") {
    const current = visibleNodes[currentIndex];
    if (current?.type === "folder") {
      setExpanded((prev) => new Set(prev).add(current.id));
    }
  }

  // Collapse folder
  if (e.key === "ArrowLeft") {
    const current = visibleNodes[currentIndex];
    if (current?.type === "folder") {
      setExpanded((prev) => {
        const next = new Set(prev);
        next.delete(current.id);
        return next;
      });
    }
  }

  // Confirm selection
  if (e.key === "Enter") {
    e.preventDefault();
    const current = focusedId ? visibleNodes.find((n) => n.id === focusedId) : visibleNodes[0];
    if (current) {
      setSelectedId(current.id);
      if (window.innerWidth < 640) {
        setShowProperties(true);
      }
    }
  }
}
