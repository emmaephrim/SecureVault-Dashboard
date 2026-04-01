import { SectionTitle } from "./ui/section-title";
import FileTree from "./ui/file-tree";
import type { FileExplorerPanelProps, Node } from "../types";

export default function FileExplorerPanel({ data, expanded, setExpanded, selectedId, setSelectedId, focusedId, setFocusedId, showProperties, setShowProperties }: FileExplorerPanelProps): React.ReactElement {
  return (
    <section className="p-2 py-4 md:pl-6 pt-3 w-full overflow-x-auto bg-brand-surface-container  h-[calc(100vh-189px)] lg:pb-[60px]">
      <SectionTitle>FILE EXPLORER</SectionTitle>
      <FileTree data={data as Node[]} expanded={expanded} setExpanded={setExpanded} selectedId={selectedId} setSelectedId={setSelectedId} focusedId={focusedId} setFocusedId={setFocusedId} showProperties={showProperties} setShowProperties={setShowProperties} />
    </section>
  );
}
