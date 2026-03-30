import PropertiesMetadata from "./ui/properties-metadata";
import PropertiesHeader from "./ui/properties-panel-header";
import { SectionTitle } from "./ui/section-title";

// function buildMap(data) {
//   const map = new Map();

//   function traverse(nodes) {
//     for (const node of nodes) {
//       map.set(node.id, node);
//       if (node.children) traverse(node.children);
//     }
//   }

//   traverse(data);
//   return map;
// }

export default function PropertiesPanel(): React.ReactElement {
  return (
    <section className="min-w-[30rem] border-brand-primary border-l-[1px] min-h-[calc(100vh-233px)] overflow-x-auto">
      <div className="p-5">
        <SectionTitle>PROPERTIES</SectionTitle>
      </div>
      <hr className="border-t-1 border-brand-primary w-full" />
      {/* Section for file and folder Properties */}
      <PropertiesHeader name="item name" type="folder" />
      <PropertiesMetadata name="Partner_Contact_Database.xlsx" size={"1KB"} type="Folder" items={2} id={"log_data"} />
    </section>
  );
}
