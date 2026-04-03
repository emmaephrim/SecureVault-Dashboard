import type { Node } from "../../types";

export default function BreadcrumbItem({ node, onNavigate, setFocusedId }: { node: Node; onNavigate: (id: string) => void; setFocusedId: (value: string | null) => void }): React.ReactElement {
  return (
    <button
      onClick={() => {
        onNavigate(node.id);
        setFocusedId(node.id);
      }}
      className="shrink-0 text-brand-outline text-body-md sm:text-title-md text-nowrap flex items-center flex-row hover:bg-brand-primary-container hover:text-brand-on-primary-container group py-1 px-2 rounded-sm transition-colors duration-200"
    >
      {node.name}
    </button>
  );
}
