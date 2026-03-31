import FileExplorerPanel from "../file-explorer-panel";
import Footer from "../footer";
import PropertiesPanel from "../properties-panel";
import Breadcrumb from "../breadcrumb";
import MainHeader from "../ui/main-header";
import Searchbar from "../search-bar";
import { useMemo, useState } from "react";
import data from "../../../data.json";
import type { Node } from "../../types";

export const DashboardLayout: React.FC = () => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

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
  const selectedNode = selectedId ? nodeMap.get(selectedId) : null;

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

  function getPath(selectedId: string | null, parentMap: Map<string, string | null>, nodeMap: Map<string, Node>) {
    if (!selectedId) return [];

    const path = [];
    let current: string | null = selectedId;

    while (current) {
      const node = nodeMap.get(current);
      if (!node) break;
      path.unshift(node);
      current = parentMap.get(current) ?? null;
    }

    return path;
  }

  const parentMap = useMemo(() => buildParentMap(data as Node[]), []);
  const breadcrumbPath = getPath(selectedId, parentMap, nodeMap);

  function getItemCount() {
    if (!selectedNode) return data.length;

    // If folder, count its children
    if (selectedNode.type === "folder") {
      return selectedNode.children?.length || 0;
    }

    // If file, count siblings (parent folder)
    const parentId = parentMap.get(selectedNode.id);
    if (!parentId) return data.length;

    const parent = nodeMap.get(parentId);
    return parent?.children?.length || 0;
  }

  // Recursively filter tree plus mark folders to expand
  function filterTree(nodes: Node[], query: string, expandedSet: Set<string>): Node[] {
    if (!query) return nodes;

    const lowerQuery = query.toLowerCase();

    return nodes
      .map((node): Node | null => {
        // If node matches, include it
        if (node.name.toLowerCase().includes(lowerQuery)) {
          if (node.type === "folder") {
            expandedSet.add(node.id); // auto-expand match
          }
          return node;
        }

        // If children match, include parent
        if (node.children) {
          const filteredChildren = filterTree(node.children, query, expandedSet);

          if (filteredChildren.length > 0) {
            expandedSet.add(node.id); // expand parent
            return { ...node, children: filteredChildren };
          }
        }

        return null;
      })
      .filter((node): node is Node => node !== null); // proper type guard
  }

  // Compute filtered tree + expanded nodes
  const { filteredData, autoExpanded } = useMemo(() => {
    const newExpanded = new Set<string>();

    const result = filterTree(data as Node[], query, newExpanded);

    return {
      filteredData: result,
      autoExpanded: newExpanded,
    };
  }, [query]);

  // Final expansion
  const effectiveExpanded = useMemo(() => {
    return new Set([...expanded, ...autoExpanded]);
  }, [expanded, autoExpanded]);

  return (
    <>
      <section className="fixed w-full top-0 bg-brand-surface">
        <div className="px-2 md:px-6 py-3">
          {/* Header with logo */}
          <MainHeader />
          {/* Search Bar */}
          <Searchbar query={query} setQuery={setQuery} />
          {/* Breadcrumb for directory navigation */}
          <Breadcrumb path={breadcrumbPath} onNavigate={setSelectedId} setQuery={setQuery} />
        </div>

        <div>
          <hr className="border-t-1 border-brand-primary" />
        </div>
      </section>

      <section className="mt-[189px] w-full">
        <div className="flex flex-row justify-end">
          <FileExplorerPanel data={filteredData} expanded={effectiveExpanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} />

          <PropertiesPanel node={selectedNode} />
        </div>
      </section>

      {/* footer */}
      <Footer length={getItemCount()} fileName={selectedNode?.type === "file" ? selectedNode.name : undefined} />
    </>
  );
};
