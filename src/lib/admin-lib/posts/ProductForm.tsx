"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";

interface ProductFormProps {
  onCancel: () => void;
  onSave: (data: FormData) => void;
  initialData?: any;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onCancel,
  onSave,
  initialData,
  loading
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    initialData?.image || null
  );
  const [product, setProduct] = React.useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    discount: initialData?.discount || "",
    category: initialData?.category || "",
    brand: initialData?.brand || "The Winifred Akin RTW",
    published: initialData?.published?.toString() || "true"
  });

  const [features, setFeatures] = React.useState<
    Array<{ label: string; value: string }>
  >(initialData?.features || [{ label: "", value: "" }]);

  React.useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        discount: initialData.discount || "",
        category: initialData.category || "",
        brand: initialData.brand || "The Winifred Akin RTW",
        published: initialData.published?.toString() || "false"
      });
      setFeatures(initialData.features || [{ label: "", value: "" }]);
      setImagePreview(initialData.image || null);
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        brand: "The Winifred Akin RTW",
        published: "true"
      });
      setFeatures([{ label: "", value: "" }]);
      setImagePreview(null);
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (
    idx: number,
    field: "label" | "value",
    val: string
  ) => {
    setFeatures(prev =>
      prev.map((f, i) => (i === idx ? { ...f, [field]: val } : f))
    );
  };
  const addFeature = () =>
    setFeatures(prev => [...prev, { label: "", value: "" }]);
  const removeFeature = (idx: number) =>
    setFeatures(prev =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !initialData?.image) {
      alert("Please upload an image.");
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    Object.entries(product).forEach(([key, value]) => {
      if (key !== "features") {
        formData.append(key, value);
      }
    });
    formData.append("features", JSON.stringify(features));
    onSave(formData);
  };

  const inputClass =
    "rounded-lg border border-gray-200 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 text-sm sm:text-base hover:border-gray-300";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const sectionClass =
    "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 space-y-4";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {initialData ? "Edit Product" : "Create New Product"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Fill in the information below to {initialData ? "update" : "create"}{" "}
            your product
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Basic Information Section */}
          <div className={sectionClass}>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
              Basic Information
            </h2>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className={labelClass}>Product Name *</label>
                <InputGroup.Input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Description *</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  className={`${inputClass} min-h-[100px] sm:min-h-[120px] resize-none`}
                  placeholder="Describe your product in detail..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className={sectionClass}>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
              Pricing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className={labelClass}>Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₦
                  </span>
                  <InputGroup.Input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    className={`${inputClass} pl-8`}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Discount (%)</label>
                <div className="relative">
                  <InputGroup.Input
                    type="number"
                    name="discount"
                    value={product.discount}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className={sectionClass}>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-purple-500 rounded-full mr-3"></span>
              Product Image
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Upload Image *</label>
                <div className="relative">
                  <InputGroup.Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`${inputClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                    required={!initialData?.image}
                  />
                </div>
              </div>

              {imagePreview && (
                <div className="flex justify-center sm:justify-start">
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="rounded-lg w-32 h-32 sm:w-40 sm:h-40 object-cover border-2 border-gray-200 shadow-md transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category & Brand Section */}
          <div className={sectionClass}>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-orange-500 rounded-full mr-3"></span>
              Category & Brand
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className={labelClass}>Category *</label>
                <InputGroup.Input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g., Casual, Formal, Sports"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Brand *</label>
                <select
                  name="brand"
                  value={product.brand}
                  onChange={handleInputChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="The Winifred Akin RTW">
                    The Winifred Akin RTW
                  </option>
                  <option value="My style Express">My style Express</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Specifications Section */}
          <div className={sectionClass}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0 flex items-center">
                <span className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></span>
                Product Specifications
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeature}
                className="w-full sm:w-auto bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                disabled={features.length >= 4}
              >
                + Add Feature
              </Button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Feature Name
                      </label>
                      <InputGroup.Input
                        value={feature.label}
                        onChange={e =>
                          handleFeatureChange(idx, "label", e.target.value)
                        }
                        placeholder="e.g., Material, Size, Color"
                        className={`${inputClass} bg-white`}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Feature Value
                      </label>
                      <InputGroup.Input
                        value={feature.value}
                        onChange={e =>
                          handleFeatureChange(idx, "value", e.target.value)
                        }
                        placeholder="e.g., 100% Cotton, Large, Blue"
                        className={`${inputClass} bg-white`}
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFeature(idx)}
                        disabled={features.length === 1}
                        className="w-full sm:w-10 h-10 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg"
                      >
                        <span className="text-lg font-medium">×</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publication Status Section */}
          <div className={sectionClass}>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-teal-500 rounded-full mr-3"></span>
              Publication Status
            </h2>

            <div>
              <label className={labelClass}>Status *</label>
              <select
                name="published"
                value={product.published}
                onChange={handleInputChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="true">Published (Visible to customers)</option>
                <option value="false">Draft (Hidden from customers)</option>
              </select>
            </div>
          </div>

          {/* Sticky Action Buttons for Mobile */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:relative sm:border-0 sm:bg-transparent sm:p-0">
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto h-11 sm:h-9 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto h-11 sm:h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : initialData ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Bottom Padding for Mobile Sticky Buttons */}
        <div className="h-20 sm:h-0"></div>
      </div>
    </div>
  );
};

export default ProductForm;
