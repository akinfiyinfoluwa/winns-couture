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
    brand: initialData?.brand || "The Winifred Akin RTW",
    published: initialData?.published?.toString() || "true"
  });


  React.useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        discount: initialData.discount || "",
        brand: initialData.brand || "The Winifred Akin RTW",
        published: initialData.published?.toString() || "false"
      });
      setImagePreview(initialData.image || null);
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        discount: "",
        brand: "The Winifred Akin RTW",
        published: "true"
      });
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
    onSave(formData);
  };

  const inputClass =
    "rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white input-class text-sm sm:text-base border border-gray-200 transition-all duration-200 ease-in-out hover:border-primary/30";

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <InputGroup.Input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className={`${inputClass} p-4 min-h-[120px] resize-y`}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <InputGroup.Input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Discount (%)
            </label>
            <InputGroup.Input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
            <InputGroup.Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              required
            />
            {imagePreview && (
              <div className="mt-4 flex justify-center sm:justify-start">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-lg w-10 h-10 sm:w-10 sm:h-10 object-cover border shadow-sm hover:shadow-md transition-shadow duration-200"
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand
            </label>
            <select
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="The Winifred Akin RTW">
                The Winifred Akin RTW
              </option>
              <option value="My style Express">My style Express</option>
            </select>
          </div>
        </div>
        <div>
          
  
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Published
          </label>
          <select
            name="published"
            value={product.published}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        
       <div className="mx-auto flex max-w-4xl flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4 sm:pb-20">
  <Button
    type="button"
    variant="secondary"
    onClick={onCancel}
    className="w-full sm:w-auto bg-gray-50 text-gray-700 transition-colors hover:bg-gray-100 border border-gray"
  >
    Cancel
  </Button>
  <Button
    type="submit"
    disabled={loading}
    className="w-full sm:w-auto shadow-sm transition-shadow duration-200 hover:shadow-md"
  >
    {loading ? "Saving..." : "Save"}
  </Button>
</div>
      
      <hr style={{padding:"30px"}} />

      </form>
    </div>
  );
};

export default ProductForm;
