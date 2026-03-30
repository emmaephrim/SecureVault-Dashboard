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

  const nodeMap = useMemo(() => buildNodeMap(data), []);
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

  function getPath(selectedId: string | null, parentMap, nodeMap) {
    if (!selectedId) return [];

    const path = [];
    let current = selectedId;

    while (current) {
      const node = nodeMap.get(current);
      if (!node) break;
      path.unshift(node);
      current = parentMap.get(current);
    }

    return path;
  }

  const parentMap = useMemo(() => buildParentMap(data), []);
  const breadcrumbPath = getPath(selectedId, parentMap, nodeMap);

  return (
    <>
      <section className="fixed w-full top-0 bg-brand-surface">
        <div className="px-2 md:px-6 py-3">
          {/* Header with logo */}
          <MainHeader />
          {/* Search Bar */}
          <Searchbar />
          {/* Breadcrumb for directory navigation */}
          <Breadcrumb path={breadcrumbPath} onNavigate={setSelectedId} />
        </div>

        <div>
          <hr className="border-t-1 border-brand-primary" />
        </div>
      </section>

      <section className="mt-[189px] w-full">
        <div className="flex flex-row justify-end">
          <FileExplorerPanel data={data} expanded={expanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} />

          <PropertiesPanel node={selectedNode} />
        </div>
      </section>

      {/* footer */}
      <Footer length={data.length} fileName={selectedNode?.type === "file" ? selectedNode.name : undefined} />
    </>
  );
};
