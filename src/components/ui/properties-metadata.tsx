import { LuCaseSensitive } from "react-icons/lu";
import { LuShapes } from "react-icons/lu";
import { LuHardDrive } from "react-icons/lu";
import { LuFingerprint } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import type { IconType } from "react-icons";

const propertiesIcons: Record<string, IconType> = {
  name: LuCaseSensitive,
  type: LuShapes,
  size: LuHardDrive,
  id: LuFingerprint,
  item: LuLayers,
  items: LuLayers,
};

const Item: React.FC<{ name: string; value: string | number }> = ({ name, value }) => {
  const iconKey = name.toLowerCase();
  const Icon = propertiesIcons[iconKey];

  return (
    <div className="mb-2 px-2 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2 sm:gap-4 bg-brand-secondary-container p-2 text-brand-on-primary-container text-body-md rounded-md">
      <span className="font-medium opacity-80 flex items-center">
        {Icon && <Icon className="inline mr-1" />} {name}:
      </span>
      <span className="font-medium opacity-80 text-white break-words">{value}</span>
    </div>
  );
};

export default function PropertiesMetadata({ name, type, id, size, items = 0 }: { name: string; type: string; id: string; size?: number | string; items?: number }) {
  return (
    <div className="px-5">
      <p className="text-brand-on-surface-variant text-label-md-emph uppercase mb-4">Metadata</p>
      <Item name={"Name"} value={name} />

      <div className="grid grid-cols-2 gap-x-2 sm:hidden">
        <Item name={"Type"} value={type} />
        {size && <Item name={"Size"} value={size} />}
      </div>
      <div className="hidden sm:block">
        <Item name={"Type"} value={type} />
        {size && <Item name={"Size"} value={size} />}
      </div>

      <Item name={"ID"} value={id} />

      {type === "folder" && <Item name={items > 1 ? "Items" : "Item"} value={items as number} />}
    </div>
  );
}
