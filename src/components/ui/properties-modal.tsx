import PropertiesContent from "./properties-content";
import type { PropertiesModalProps } from "../../types";
import { IoIosCloseCircle } from "react-icons/io";
export default function PropertiesModal({ node, open, onClose }: PropertiesModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-inverse-surface/40 flex items-end sm:hidden transition-opacity duration-300" style={{ opacity: open ? 1 : 0 }}>
      <div className="bg-brand-surface w-full rounded-t-2xl max-h-[80vh] overflow-y-auto transform transition-transform duration-300" style={{ transform: open ? "translateY(0)" : "translateY(100%)" }}>
        <div className="p-4 border-b border-brand-primary flex justify-between items-center">
          <span className="font-semibold text-brand-primary">Properties</span>
          <button onClick={onClose} className="">
            <IoIosCloseCircle className="text-brand-on-primary-container w-9 h-9" />
          </button>
        </div>

        <div className="py-4">
          <PropertiesContent node={node} />
        </div>
      </div>
    </div>
  );
}
