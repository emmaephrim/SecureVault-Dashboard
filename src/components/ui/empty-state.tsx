import { FiHardDrive } from "react-icons/fi";

export default function EmptyState(): React.ReactElement {
  return (
    <div className="flex flex-col w-full h-[calc(100%-77px)] items-center justify-center overflow-y-auto">
      <FiHardDrive className="text-brand-outline h-[4rem] w-[4rem]" />
      <p className="text-brand-outline text-body-sm-emph">Select file or folder to view details</p>
    </div>
  );
}
