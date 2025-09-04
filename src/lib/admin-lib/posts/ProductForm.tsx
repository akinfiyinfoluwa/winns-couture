"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import InputGroup from '@/components/ui/input-group';

interface ProductFormProps {
  onCancel: () => void;
  onSave: (data: FormData) => void;
  initialData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onCancel, onSave, initialData }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [product, setProduct] = useState({
    name: initialData?.name || "Test Product",
    description: initialData?.description || "This is a test product.",
    price: initialData?.price || "99.99",
    discount: initialData?.discount || "10",
    category: initialData?.category || "Test",
    brand: initialData?.brand || "Tester",
    published: initialData?.published?.toString() || "true",
  });

  const [features, setFeatures] = useState<Array<{ label: string; value: string }>>(initialData?.features || [{ label: "", value: "" }]);

  React.useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        discount: initialData.discount || "",
        category: initialData.category || "",
        brand: initialData.brand || "",
        published: initialData.published?.toString() || "false",
      });
      setFeatures(initialData.features || [{ label: "", value: "" }])
      setImagePreview(initialData.image || null);
    } else {
      setProduct({
        name: "Test Product",
        description: "This is a test product.",
        price: "99.99",
        discount: "10",
        category: "Test",
        brand: "Tester",
        published: "true",
      });
      setFeatures([{ label: "", value: "" }])
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (idx: number, field: 'label' | 'value', val: string) => {
    setFeatures(prev => prev.map((f, i) => i === idx ? { ...f, [field]: val } : f))
  }
  const addFeature = () => setFeatures(prev => [...prev, { label: '', value: '' }])
  const removeFeature = (idx: number) => setFeatures(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    Object.entries(product).forEach(([key, value]) => {
      if (key !== 'features') {
        formData.append(key, value);
      }
    });
    formData.append('features', JSON.stringify(features));
    onSave(formData);
  };

  const inputClass = 'rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black/20 bg-white input-class text-sm sm:text-base';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2">Name</label>
          <InputGroup.Input type="text" name="name" value={product.name} onChange={handleInputChange} className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2">Description</label>
          <textarea name="description" value={product.description} onChange={handleInputChange} className={`${inputClass} p-3 sm:p-5`} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Price</label>
            <InputGroup.Input type="text" name="price" value={product.price} onChange={handleInputChange} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Discount (%)</label>
            <InputGroup.Input type="number" name="discount" value={product.discount} onChange={handleInputChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2">Image</label>
          <InputGroup.Input type="file" accept="image/*" onChange={handleFileChange} className={inputClass} />
          {imagePreview && (
            <div className="mt-2 flex justify-center sm:justify-start">
              <img src={imagePreview} alt="Preview" className="rounded w-24 h-24 sm:w-32 sm:h-32 object-cover border" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Category</label>
            <InputGroup.Input type="text" name="category" value={product.category} onChange={handleInputChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Brand</label>
            <InputGroup.Input type="text" name="brand" value={product.brand} onChange={handleInputChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 sm:mb-3">Product Specification</label>
          <div className="space-y-3 sm:space-y-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 sm:p-1"
              >
                <InputGroup.Input
                  value={feature.label}
                  onChange={e => handleFeatureChange(idx, 'label', e.target.value)}
                  placeholder="Label (e.g. Material)"
                  className={`${inputClass} flex-1 min-w-0`}
                />
                <InputGroup.Input
                  value={feature.value}
                  onChange={e => handleFeatureChange(idx, 'value', e.target.value)}
                  placeholder="Value (e.g. 100% Cotton)"
                  className={`${inputClass} flex-1 min-w-0`}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFeature(idx)}
                  disabled={features.length === 1}
                  className="self-center sm:ml-2 w-full sm:w-auto"
                >
                  <span 
                    className="text-sm sm:text-lg text-white bg-red-800 px-3 py-1 sm:px-4 sm:py-2 rounded-sm" 
                    style={{backgroundColor:"#991b1b", border: "1px solid red"}}
                  >
                    &times;
                  </span>
                </Button>
              </div>
            ))}
            <div className="flex justify-center sm:justify-start">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeature}
                className="mt-2 w-full sm:w-auto"
                disabled={features.length >= 4}
              >
                + Add Feature
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2">Published</label>
          <select name="published" value={product.published} onChange={handleInputChange} className={inputClass}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onCancel} className="w-full sm:w-auto order-2 sm:order-1">
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto order-1 sm:order-2">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;