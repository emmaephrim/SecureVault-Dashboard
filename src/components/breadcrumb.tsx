import { MdOutlineHome } from "react-icons/md";
import BreadcrumbItem from "./ui/breadcrumb-item";
import RightChevron from "./ui/right-chevron";

export default function Breadcrumb(): React.ReactElement {
    return (
        <>
            <div className="overflow-x-auto flex flex-row mt-4 items-center w-full whitespace-nowrap">
                <button className="shrink-0 text-brand-outline text-title-md flex items-center flex-row hover:bg-brand-primary-container hover:text-brand-on-primary-container group py-1 px-2">
                    <MdOutlineHome className="h-5 w-5 text-title-md text-brand-outline group-hover:text-brand-on-primary-container" />
                    Root
                </button>

                <RightChevron />

                <BreadcrumbItem item=" Community Affairs" />

                <RightChevron />

                <BreadcrumbItem item=" Partnership & Outreach" />

                <RightChevron />

                <span className="shrink-0 text-brand-primary text-title-md px-2">
                    Partner_Contact_Database.xlsx
                </span>
            </div>
        </>
    )
}
