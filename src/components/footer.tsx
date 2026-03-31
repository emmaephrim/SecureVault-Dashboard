import { LuArrowUpDown } from "react-icons/lu";
import { NavigationSign } from "./ui/navigation-sign";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

export default function Footer({ length, fileName }: { length: number; fileName?: string }): React.ReactElement {
  return (
    <>
      <div className="px-6 py-2 flex flex-row justify-between items-center border-2 border-t-brand-primary border-b-0 border-x-0 fixed w-full bottom-0 bg-brand-surface">
        <div className="text-brand-on-surface text-body-md flex flex-row items-center shrink-0 gap-2">
          <span>
            {length} item{length > 1 ? "s" : ""}
          </span>
          {fileName && (
            <span className="text-brand-primary flex flex-row items-center gap-1 shrink-0">
              <GoDotFill className="text-brand-primary" />
              {fileName}
            </span>
          )}
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
  );
}
