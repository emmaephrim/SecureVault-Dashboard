import { FaRegFile } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";

const layout: Record<string, string> = {
  iconContainer: "shrink-0 text-title-md text-brand-primary bg-brand-on-primary w-16 rounded-md h-16 p-2 border-2 border-brand-inverse-primary mr-3",
};

export default function PropertiesPanelHeader({ name, type }: { name: string; type: string }): React.ReactElement {
  return (
    <>
      <div className="px-5 py-3">
        <div className="flex items-center">
          {type == "file" ? <FaRegFile className={`${layout.iconContainer}`} /> : <FaRegFolder className={`${layout.iconContainer}`} />}
          <div>
            <h1 className="text-brand-on-surface text-body-lg-emph">{name}</h1>
            <p className="text-brand-outline capitalize text-body-md-emph">{type}</p>
          </div>
        </div>
      </div>

      <hr className="border-1 border-brand-primary pb-5" />

      <div className="px-5 ">
        <p className="text-brand-on-surface-variant text-label-md-emph uppercase">Properties</p>
      </div>
    </>
  );
}
