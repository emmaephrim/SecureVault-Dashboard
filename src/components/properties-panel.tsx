import type { Node } from "../types";
import PropertiesMetadata from "./ui/properties-metadata";
import PropertiesHeader from "./ui/properties-panel-header";
import { SectionTitle } from "./ui/section-title";

export default function PropertiesPanel({ node }: { node?: Node | null }): React.ReactElement {
  if (!node) {
    // return <EmptyState />
    return <h1>I'm Empty</h1>;
  }

  return (
    <section className="min-w-[30rem] border-brand-primary border-l-[1px] min-h-[calc(100vh-233px)] overflow-x-auto">
      <div className="p-5">
        <SectionTitle>PROPERTIES</SectionTitle>
      </div>
      <hr className="border-t-1 border-brand-primary w-full" />
      {/* Section for file and folder Properties */}
      {/* <PropertiesHeader name="item name" type="folder" />
      <PropertiesMetadata name="Partner_Contact_Database.xlsx" size={"1KB"} type="Folder" items={2} id={"log_data"} /> */}

      <PropertiesHeader name={node.name} type={node.type} />

      <PropertiesMetadata name={node.name} size={node.size} type={node.type} items={node.children?.length || 0} id={node.id} />
    </section>
  );
}

// export default function PropertiesPanel({ node }) {
//   if (!node) {
//     // return <EmptyState />
//     return <h1>I'm Empty</h1>;
//   }

//   return (
//     <>
//       <PropertiesHeader name={node.name} type={node.type} />

//       <PropertiesMetadata name={node.name} size={node.size} type={node.type} items={node.children?.length || 0} id={node.id} />
//     </>
//   );
// }
