import EmptyState from "./empty-state";
import PropertiesPanelHeader from "./properties-panel-header";
import type { Node } from "../../types";
import PropertiesMetadata from "./properties-metadata";

export default function PropertiesContent({ node }: { node?: Node | null }): React.ReactElement {
  if (!node) return <EmptyState />;

  return (
    <>
      <PropertiesPanelHeader name={node.name} type={node.type} />
      <PropertiesMetadata name={node.name} size={node.size} type={node.type} items={node.children?.length || 0} id={node.id} />
    </>
  );
}
