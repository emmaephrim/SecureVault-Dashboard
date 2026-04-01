import type { Node } from "../types";
import EmptyState from "./ui/empty-state";
import PropertiesContent from "./ui/properties-content";
import { SectionTitle } from "./ui/section-title";

export default function PropertiesPanel({ node }: { node?: Node | null }): React.ReactElement {
  return (
    // 233
    <section className="hidden sm:block min-w-[20rem] lg:min-w-[30rem] border-l border-brand-primary sticky top-[189px] h-[calc(100vh-189px)] overflow-auto">
      <div className="p-5">
        <SectionTitle>PROPERTIES</SectionTitle>
      </div>
      <hr className="border-t-1 border-brand-primary w-full mb-3" />
      {!node ? <EmptyState /> : <PropertiesContent node={node} />}
    </section>
  );
}
