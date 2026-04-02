import { FaRegFile } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";

const layout: Record<string, string> = {
  iconContainer: "shrink-0 text-title-md text-brand-primary bg-brand-on-primary w-16 rounded-md h-16 p-2 border-2 border-brand-inverse-primary mr-3",
};

export default function PropertiesPanelHeader({ name, type }: { name: string; type: string }): React.ReactElement {
  return (
    <div className="px-5 pb-3">
      <div className="flex items-center gap-x-3 w-full min-w-0 overflow-hidden">
        <div className="w-[64px] h-[64]">{type == "file" ? <FaRegFile className={`${layout.iconContainer}`} /> : <FaRegFolder className={`${layout.iconContainer}`} />}</div>
        <div>
          <span className="text-brand-on-surface text-body-lg-emph text-wrap">{name}</span>
          <p className="text-brand-outline capitalize text-body-md-emph">{type}</p>
        </div>
      </div>
    </div>
  );
}
