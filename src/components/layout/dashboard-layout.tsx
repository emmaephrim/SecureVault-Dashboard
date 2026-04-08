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
import { buildNodeMap, buildParentMap, getPath, filterTree, handleKey, flattenVisible } from "../../helper";

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

  // Build a memoized lookup map (id -> node) for fast node access
  const nodeMap = useMemo(() => buildNodeMap(data as Node[]), []);
  // Get the currently selected node object
  const selectedNode = selectedId ? nodeMap.get(selectedId) : null;

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

  // Run filter plus collect auto-expanded folders
  const { filteredData, autoExpanded } = useMemo(() => {
    const newExpanded = new Set<string>();
    const result = filterTree(data as Node[], query, newExpanded);

    return {
      filteredData: result,
      autoExpanded: newExpanded,
    };
  }, [query]);

  // Merge manual expansion with auto-expansion from search
  const effectiveExpanded = useMemo(() => {
    return new Set([...expanded, ...autoExpanded]);
  }, [expanded, autoExpanded]);

  const visibleNodes = useMemo(() => {
    return flattenVisible(filteredData, effectiveExpanded);
  }, [filteredData, effectiveExpanded]);

  // Basic keyboard navigation (similar to file explorers)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      handleKey({ e, visibleNodes, focusedId, setFocusedId, setExpanded, setSelectedId, setShowProperties });
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visibleNodes, focusedId]);

  return (
    <>
      <section className="fixed w-full top-0">
        <div className="px-2 md:px-6 py-3 bg-brand-background">
          <MainHeader />
          {/* Search input */}
          <Searchbar query={query} setQuery={setQuery} setFocusedId={setFocusedId} />
          {/* Breadcrumb navigation based on selected node */}
          <Breadcrumb path={breadcrumbPath} onNavigate={setSelectedId} setQuery={setQuery} setFocusedId={setFocusedId} />
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

      {selectedNode?.type === "file" && <PropertiesModal node={selectedNode} open={showProperties} onClose={() => setShowProperties(false)} />}
    </>
  );
};
