import EmptyState from "./empty-state";
import PropertiesPanelHeader from "./properties-panel-header";
import type { Node } from "../../types";
import PropertiesMetadata from "./properties-metadata";

export default function PropertiesContent({ node }: { node?: Node | null }): React.ReactElement {
  if (!node) return <EmptyState />;

  return (
    <>
      <PropertiesPanelHeader name={node.name} type={node.type} />
      <hr className="border-t-1 border-brand-primary pb-5 w-full" />
      <PropertiesMetadata name={node.name} size={node.size} type={node.type} items={node.children?.length || 0} id={node.id} />
    </>
  );
}
