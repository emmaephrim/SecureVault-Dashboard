import { SectionTitle } from "./ui/section-title";
import FileTree from "./ui/file-tree";
import type { FileExplorerPanelProps, Node } from "../types";

export default function FileExplorerPanel({ data, expanded, setExpanded, selectedId, setSelectedId, focusedId, setFocusedId }: FileExplorerPanelProps): React.ReactElement {
  return (
    <section className="p-2 py-4 md:pl-6 pt-3 w-full overflow-x-auto bg-brand-surface-container">
      <SectionTitle>FILE EXPLORER</SectionTitle>
      <FileTree data={data as Node[]} expanded={expanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} focusedId={focusedId} setFocusedId={setFocusedId} />
    </section>
  );
}
