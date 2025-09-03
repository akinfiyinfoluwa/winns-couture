import React, { useState, useRef, useEffect } from 'react'
import InputGroup from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'

interface Feature {
  label: string;
  value: string;
}

interface Discount {
  amount: string;
  percentage: string;
}

interface ProductFormProps {
  onCancel: () => void;
  onSave: (data: any) => void;
  initialData?: {
    title?: string;
    image?: string;
    price?: string;
    description?: string; 
    discount?: Discount;
    category?: string;
    sizes?: string[];
    colors?: string[];
    dressStyle?: string;
    brand?: string;
    features?: Feature[];
  };
}

// Multi-select dropdown component
interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  label: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const displayText = selectedValues.length === 0 
    ? placeholder 
    : `${selectedValues.length} ${label.toLowerCase()}${selectedValues.length === 1 ? '' : 's'} selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black/20 bg-white border border-gray-300 text-left flex justify-between items-center text-sm sm:text-base"
      >
        <span className={selectedValues.length === 0 ? 'text-gray-500' : 'text-black'}>
          {displayText}
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggleOption(option.value)}
                className="mr-2 rounded"
              />
              <span className="flex-1">{option.label}</span>
              {option.value.startsWith('bg-') && (
                <div className={`w-4 h-4 rounded-full ml-2 ${option.value} ${option.value === 'bg-white' ? 'border border-gray-300' : ''}`}></div>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductForm: React.FC<ProductFormProps> = ({ onCancel, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)
  const [price, setPrice] = useState(initialData?.price || '')
  const [discount, setDiscount] = useState<Discount>(initialData?.discount || { amount: '', percentage: '' })
  const [category, setCategory] = useState(initialData?.category || '')
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || [])
  const [colors, setColors] = useState<string[]>(initialData?.colors || [])
  const [dressStyle, setDressStyle] = useState(initialData?.dressStyle || '')
  const [brand, setBrand] = useState(initialData?.brand || '')
  const [features, setFeatures] = useState<Feature[]>(initialData?.features || [{ label: '', value: '' }])

  const sizeOptions = [
    { value: 'Small', label: 'Small' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Large', label: 'Large' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
  ];

  const colorOptions = [
    { value: 'bg-red-600', label: 'Red' },
    { value: 'bg-blue-600', label: 'Blue' },
    { value: 'bg-green-600', label: 'Green' },
    { value: 'bg-yellow-300', label: 'Yellow' },
    { value: 'bg-black', label: 'Black' },
    { value: 'bg-silver', label: 'White' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImage(file || null)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleFeatureChange = (idx: number, field: 'label' | 'value', val: string) => {
    setFeatures(prev => prev.map((f, i) => i === idx ? { ...f, [field]: val } : f))
  }
  const addFeature = () => setFeatures(prev => [...prev, { label: '', value: '' }])
  const removeFeature = (idx: number) => setFeatures(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev)

  const inputClass = 'rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black/20 bg-white input-class text-sm sm:text-base'

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <form className="space-y-4 sm:space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2">Title</label>
          <InputGroup.Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter product title"
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2">Description</label>
          <InputGroup.Input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Ex: this product is made for indian bosschicks"
            className={`${inputClass} p-3 sm:p-5`}
          />
        </div>

        {/* Price and Discount - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Price</label>
            <InputGroup.Input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="100"
              min={0}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Discount %</label>
            <InputGroup.Input
              type="number"
              value={discount.percentage}
              onChange={e => setDiscount(d => ({ ...d, percentage: e.target.value }))}
              placeholder="10"
              min={0}
              max={100}
              className={inputClass}
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1 sm:mb-2">Image</label>
          <InputGroup.Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className={inputClass} 
          />
          {imagePreview && (
            <div className="mt-2 flex justify-center sm:justify-start">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="rounded w-24 h-24 sm:w-32 sm:h-32 object-cover border" 
              />
            </div>
          )}
        </div>

        {/* Category and Dress Style - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Category</label>
            <InputGroup.Input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="T-shirts"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Dress Style</label>
            <InputGroup.Input
              value={dressStyle}
              onChange={e => setDressStyle(e.target.value)}
              placeholder="Casual"
              className={inputClass}
            />
          </div>
        </div>

        {/* Sizes, Colors, and Brand - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Sizes</label>
            <MultiSelectDropdown
              options={sizeOptions}
              selectedValues={sizes}
              onChange={setSizes}
              placeholder="Select sizes"
              label="size"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Colors</label>
            <MultiSelectDropdown
              options={colorOptions}
              selectedValues={colors}
              onChange={setColors}
              placeholder="Select colors"
              label="color"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium mb-1 sm:mb-2">Brand</label>
            <select
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className={inputClass}
            >
              <option value="">Select a brand</option>
              <option value="mystyle-express">MyStyle Express</option>
              <option value="gucci">The WinifredAkin RTW</option>
            </select>
          </div>
        </div>

        {/* Product Specifications */}
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 pt-4 border-t">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={() => onSave({ 
              title, 
              description,
              image: image || imagePreview,
              price, 
              discount, 
              category, 
              sizes,
              colors,
              dressStyle, 
              brand, 
              features 
            })}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
