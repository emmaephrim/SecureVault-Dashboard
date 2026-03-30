import { LuArrowUpDown } from "react-icons/lu";
import { NavigationSign } from "./navigation-sign";
import { FaArrowsLeftRight } from "react-icons/fa6";

export default function Footer({ length }: { length: number }): React.ReactElement {
    return (
        <>
            <div className="px-6 py-2 flex flex-row justify-between items-center border-2 border-t-brand-primary border-b-0 border-x-0">
                <div className="text-brand-on-surface text-body-md">
                    {length} items
                </div>

                <div className="flex flex-row items-center">
                    <span className="text-body-sm-emph text-brand-on-surface mr-2">Keyboard shortcuts: </span>
                    <NavigationSign shortcut="Navigate">
                        <LuArrowUpDown className="text-brand-on-surface h-5 w-5" />
                    </NavigationSign>

                    <NavigationSign shortcut="Expand/Collapse">
                        <FaArrowsLeftRight className="text-brand-on-surface h-5 w-5" />
                    </NavigationSign>

                    <NavigationSign shortcut="Select">
                        <span className="text-brand-on-surface text-body-sm"> Enter </span>
                    </NavigationSign>
                </div>
            </div>
        </>
    )
}
