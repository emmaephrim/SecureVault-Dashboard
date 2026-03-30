import Breadcrumb from "../ui/breadcrumb"
import Footer from "../ui/footer"
import MainHeader from "../ui/main-header"
import Searchbar from "../ui/search-bar"

export const DashboardLayout: React.FC = () => {
    return (
        <>
            <div className="px-2 md:px-6 py-3">
                <MainHeader />
                <Searchbar />
                <Breadcrumb />
            </div>

            <div>
                <hr className="border-t-1 border-brand-primary" />
            </div>

            <div className="flex flex-row">
                <section className="max-w-4xl w-full border-brand-primary border-r-[1px] min-h-[calc(100vh-233px)]">



                </section>
            </div>

            {/* footer */}
            <Footer length={8} />
        </>
    )
}
