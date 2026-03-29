import Breadcrumb from "../ui/breadcrumb"
import MainHeader from "../ui/main-header"
import Searchbar from "../ui/search-bar"

export const DashboardLayout: React.FC = () => {
    return (
        <>
            <div className="px-6 py-2">
                <MainHeader />
                <Searchbar />
                <Breadcrumb />
            </div>
        </>
    )
}
