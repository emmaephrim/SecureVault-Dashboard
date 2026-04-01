import type { Node } from "../types";
import EmptyState from "./ui/empty-state";
import PropertiesMetadata from "./ui/properties-metadata";
import PropertiesHeader from "./ui/properties-panel-header";
import { SectionTitle } from "./ui/section-title";

export default function PropertiesPanel({ node }: { node?: Node | null }): React.ReactElement {
  return (
    // 233
    <section className="hidden sm:block min-w-[20rem] lg:min-w-[30rem] border-brand-primary border-l-[1px] min-h-[calc(100vh-189px)] overflow-x-auto">
      <div className="p-5">
        <SectionTitle>PROPERTIES</SectionTitle>
      </div>
      <hr className="border-t-1 border-brand-primary w-full" />
      {!node ? (
        <EmptyState />
      ) : (
        <>
          <PropertiesHeader name={node.name} type={node.type} />

          <PropertiesMetadata name={node.name} size={node.size} type={node.type} items={node.children?.length || 0} id={node.id} />
        </>
      )}
    </section>
  );
}
