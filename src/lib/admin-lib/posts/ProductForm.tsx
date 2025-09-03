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
        className="rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black/20 bg-white border border-gray-300 text-left flex justify-between items-center"
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
              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
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

  const inputClass = 'rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black/20 bg-white input-class'

  return (
    <form className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <InputGroup.Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter product title"
          className={inputClass}
        />
      </div>
       <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <InputGroup.Input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Ex: this product is made for indian bosschicks"
          className={`${inputClass} p-5`}
        />
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Price</label>
          <InputGroup.Input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="100"
            min={0}
            className={inputClass}
          />
        </div>
        
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <InputGroup.Input type="file" accept="image/*" onChange={handleImageChange} className={inputClass} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 rounded w-32 h-32 object-cover border" />
        )}
      </div>
      <div className="flex gap-3">
 
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Discount %</label>
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
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <InputGroup.Input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="T-shirts"
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Dress Style</label>
        <InputGroup.Input
          value={dressStyle}
          onChange={e => setDressStyle(e.target.value)}
          placeholder="Casual"
          className={inputClass}
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Sizes</label>
          <MultiSelectDropdown
            options={sizeOptions}
            selectedValues={sizes}
            onChange={setSizes}
            placeholder="Select sizes"
            label="size"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Colors</label>
          <MultiSelectDropdown
            options={colorOptions}
            selectedValues={colors}
            onChange={setColors}
            placeholder="Select colors"
            label="color"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Brand</label>
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
      <div>
        <label className="block text-sm font-medium mb-1">Product Specication</label>
        <div className="space-y-3 max-w-xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-row items-center gap-3 py-1 w-full"
              style={{ alignItems: 'center' }}
            >
              <InputGroup.Input
                value={feature.label}
                onChange={e => handleFeatureChange(idx, 'label', e.target.value)}
                placeholder="Label (e.g. Material)"
                className={inputClass + ' flex-1 min-w-0'}
              />
              <InputGroup.Input
                value={feature.value}
                onChange={e => handleFeatureChange(idx, 'value', e.target.value)}
                placeholder="Value (e.g. 100% Cotton)"
                className={inputClass + ' flex-1 min-w-0'}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeFeature(idx)}
                disabled={features.length === 1}
                className="ml-2"
              >
                <span className="text-lg borderp-2 text-white bg-red-800 p-2 px-4 rounded-sm" style={{backgroundColor:"#991b1b", border: "1px solid red"}}>&times;</span>
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="mt-2"
            disabled={features.length >= 4}
          >
            + Add Feature
          </Button>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button 
          type="button" 
          onClick={() => onSave({ 
            title, 
            description,
            image: image || imagePreview, // Send either new file or existing image URL
            price, 
            discount, 
            category, 
            sizes, // Now already an array
            colors, // Now already an array
            dressStyle, 
            brand, 
            features 
          })}
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default ProductForm