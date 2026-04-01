import FileExplorerPanel from "../file-explorer-panel";
import Footer from "../footer";
import PropertiesPanel from "../properties-panel";
import Breadcrumb from "../breadcrumb";
import MainHeader from "../ui/main-header";
import Searchbar from "../search-bar";
import { useEffect, useMemo, useState } from "react";
import data from "../../../data.json";
import type { Node } from "../../types";
import PropertiesModal from "../ui/properties-modal";

export const DashboardLayout: React.FC = () => {
  // Tracks which folders are open
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  // Currently selected node (confirmed via click or Enter)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Search input
  const [query, setQuery] = useState<string>("");
  // Keyboard navigation focus (separate from selection)
  const [focusedId, setFocusedId] = useState<string | null>(null);
  // Trigger modal on mobile
  const [showProperties, setShowProperties] = useState<boolean>(false);

  // Build a quick lookup map (id -> node)
  // Avoids repeatedly traversing the tree when we need a node
  function buildNodeMap(data: Node[]) {
    const map = new Map<string, Node>();
    function traverse(nodes: Node[]) {
      for (const node of nodes) {
        map.set(node.id, node);
        if (node.children) traverse(node.children);
      }
    }
    traverse(data);
    return map;
  }

  const nodeMap = useMemo(() => buildNodeMap(data as Node[]), []);
  // Get the currently selected node object
  const selectedNode = selectedId ? nodeMap.get(selectedId) : null;

  // Map each node to its parent id
  // Used for breadcrumb plus sibling calculations
  function buildParentMap(data: Node[]) {
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
  function getPath(selectedId: string | null, parentMap: Map<string, string | null>, nodeMap: Map<string, Node>) {
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

  const parentMap = useMemo(() => buildParentMap(data as Node[]), []);
  const breadcrumbPath = getPath(selectedId, parentMap, nodeMap);

  // Used in footer: how many items are in current context
  function getItemCount() {
    if (!selectedNode) return data.length;
    // If folder, count its children
    if (selectedNode.type === "folder") {
      return selectedNode.children?.length || 0;
    }
    // If file, count siblings (items in same folder)
    const parentId = parentMap.get(selectedNode.id);
    if (!parentId) return data.length;

    const parent = nodeMap.get(parentId);
    return parent?.children?.length || 0;
  }
  // Filters tree recursively while keeping structure intact
  // Also collects which folders should be auto-expanded
  function filterTree(nodes: Node[], query: string, expandedSet: Set<string>): Node[] {
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

  // Run filter plus collect auto-expanded folders
  const { filteredData, autoExpanded } = useMemo(() => {
    const newExpanded = new Set<string>();
    const result = filterTree(data as Node[], query, newExpanded);

    return {
      filteredData: result,
      autoExpanded: newExpanded,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Merge manual expansion with auto-expansion from search
  const effectiveExpanded = useMemo(() => {
    return new Set([...expanded, ...autoExpanded]);
  }, [expanded, autoExpanded]);

  // Flatten visible nodes for keyboard navigation
  // Only includes nodes that are currently visible (respecting expansion)
  function flattenVisible(nodes: Node[], expanded: Set<string>): Node[] {
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

  const visibleNodes = useMemo(() => {
    return flattenVisible(filteredData, expanded);
  }, [filteredData, expanded]);

  // Basic keyboard navigation (similar to file explorers)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!visibleNodes.length) return;
      const currentIndex = visibleNodes.findIndex((n) => n.id === focusedId);

      // Move focus down
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = currentIndex === -1 ? visibleNodes[0] : visibleNodes[currentIndex + 1];
        if (next) setFocusedId(next.id);
      }

      // Move focus up
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = currentIndex === -1 ? visibleNodes[0] : visibleNodes[currentIndex - 1];
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

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visibleNodes, focusedId]);

  return (
    <>
      <section className="fixed w-full top-0">
        <div className="px-2 md:px-6 py-3 bg-brand-background">
          <MainHeader />
          {/* Search input */}
          <Searchbar query={query} setQuery={setQuery} />
          {/* Breadcrumb navigation based on selected node */}
          <Breadcrumb path={breadcrumbPath} onNavigate={setSelectedId} setQuery={setQuery} />
        </div>

        <div>
          <hr className="border-t-1 border-brand-primary" />
        </div>
      </section>

      <section className="mt-[189px] w-full">
        <div className="flex">
          <FileExplorerPanel data={filteredData} expanded={effectiveExpanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} focusedId={focusedId} setFocusedId={setFocusedId} showProperties={showProperties} setShowProperties={setShowProperties} />
          <PropertiesPanel node={selectedNode} />
        </div>
      </section>

      {/* Footer reflects current selection context */}
      <Footer length={getItemCount()} fileName={selectedNode?.type === "file" ? selectedNode.name : undefined} />

      <PropertiesModal node={selectedNode} open={showProperties} onClose={() => setShowProperties(false)} />
    </>
  );
};
