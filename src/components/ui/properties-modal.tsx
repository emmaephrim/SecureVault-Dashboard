import PropertiesContent from "./properties-content";
import type { PropertiesModalProps } from "../../types";

export default function PropertiesModal({ node, open, onClose }: PropertiesModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:hidden">
      <div className="bg-brand-surface w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-brand-primary flex justify-between">
          <span className="font-semibold text-brand-primary">Properties</span>
          <button onClick={onClose} className="text-brand-primary text-title-md-emph">
            X
          </button>
        </div>

        <div className="p-4">
          <PropertiesContent node={node} />
        </div>
      </div>
    </div>
  );
}
