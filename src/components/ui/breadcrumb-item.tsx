export default function BreadcrumbItem({ item }: { item: string }): React.ReactElement {
    return (
        <button className="shrink-0 text-brand-outline text-title-md text-nowrap flex items-center flex-row hover:bg-brand-primary-container hover:text-brand-on-primary-container group py-1 px-2">
            {item}
        </button>
    )
}
