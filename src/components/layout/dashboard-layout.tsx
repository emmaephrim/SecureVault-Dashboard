import Breadcrumb from "../ui/breadcrumb"
import Footer from "../ui/footer"
import MainHeader from "../ui/main-header"
import Searchbar from "../ui/search-bar"

export const DashboardLayout: React.FC = () => {
    return (
        <>
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

            <div className="flex flex-row justify-end">
                <section className="p-2 w-full overflow-scroll">


                </section>

                <section className="p-2 min-w-[40rem] border-brand-primary border-l-[1px] min-h-[calc(100vh-233px)]">

                </section>
            </div>

            {/* footer */}
            <Footer length={8} fileName="Partner_Contact_Database.xlsx" />
        </>
    )
}
