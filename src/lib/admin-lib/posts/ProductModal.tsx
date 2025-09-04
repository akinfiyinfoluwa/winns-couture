import React from "react";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-lg shadow-2xl border max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{title || "Product Form"}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
            aria-label="Close"
            type="button"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-4" style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
