import FileExplorerPanel from "../file-explorer-panel"
import Footer from "../footer"
import PropertiesPanel from "../properties-panel"
import Breadcrumb from "../breadcrumb"
import MainHeader from "../ui/main-header"
import Searchbar from "../search-bar"

export const DashboardLayout: React.FC = () => {
    return (
        <>
            <section className="fixed w-full top-0 bg-brand-surface">
                <div className="px-2 md:px-6 py-3">
                    {/* Header with logo */}
                    <MainHeader />
                    {/* Search Bar */}
                    <Searchbar />
                    {/* Breadcrumb for directory navigation */}
                    <Breadcrumb />
                </div>

                <div>
                    <hr className="border-t-1 border-brand-primary" />
                </div>
            </section>



            <section className="mt-[189px]">
                <div className="flex flex-row justify-end">
                    <FileExplorerPanel />

                    <PropertiesPanel />
                </div>
            </section>

            {/* footer */}
            <Footer length={8} fileName="Partner_Contact_Database.xlsx" />
        </>
    )
}
