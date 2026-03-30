export default function BreadcrumbItem({ node, onNavigate }): React.ReactElement {
  return (
    <button onClick={() => onNavigate(node.id)} className="shrink-0 text-brand-outline text-title-md text-nowrap flex items-center flex-row hover:bg-brand-primary-container hover:text-brand-on-primary-container group py-1 px-2">
      {node.name}
    </button>
  );
}
