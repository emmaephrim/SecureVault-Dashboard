import { SectionTitle } from "./ui/section-title";

export default function PropertiesPanel(): React.ReactElement {
    return (
        <section className="min-w-[40rem] border-brand-primary border-l-[1px] min-h-[calc(100vh-233px)]">
            <div className="p-5">
                <SectionTitle>PROPERTIES</SectionTitle>
            </div>
            <hr className="border-t-1 border-brand-primary" />
            {/* Section for file and folder Properties */}

        </section>
    )
}
