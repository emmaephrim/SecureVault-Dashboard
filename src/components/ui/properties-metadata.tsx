const Item: React.FC<{ name: string | number; value: string | number }> = ({ name, value }) => {
  return (
    <div className="mb-2 px-2 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2 sm:gap-4 bg-brand-secondary-container p-2 text-brand-on-primary-container text-body-md rounded-md">
      <span className="font-medium opacity-80">{name}:</span>
      <span className="font-medium opacity-80 text-white break-words">{value}</span>
    </div>
  );
};

export default function PropertiesMetadata({ name, type, id, size, items }: { name: string; type: string; id: string; size?: number | string; items?: number }) {
  return (
    <div className="px-5">
      <p className="text-brand-on-surface-variant text-label-md-emph uppercase mb-4">Metadata</p>

      <Item name={"Name"} value={name} />
      <Item name={"Type"} value={type} />
      <Item name={"ID"} value={id} />
      {size && <Item name={"Size"} value={size} />}
      {items && <Item name={items > 1 ? "Items" : "Item"} value={items as number} />}
    </div>
  );
}
