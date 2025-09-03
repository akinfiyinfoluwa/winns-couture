import React, { useState } from 'react'
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

const ProductForm: React.FC<ProductFormProps> = ({ onCancel, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)
  const [price, setPrice] = useState(initialData?.price || '')
  const [discount, setDiscount] = useState<Discount>(initialData?.discount || { amount: '', percentage: '' })
  const [category, setCategory] = useState(initialData?.category || '')
  const [sizes, setSizes] = useState(initialData?.sizes?.[0] || '')
  const [colors, setColors] = useState(initialData?.colors?.[0] || '')
  const [dressStyle, setDressStyle] = useState(initialData?.dressStyle || '')
  const [brand, setBrand] = useState(initialData?.brand || '')
  const [features, setFeatures] = useState<Feature[]>(initialData?.features || [{ label: '', value: '' }])

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
          <label className="block text-sm font-medium mb-1">Size</label>
          <select
            value={sizes}
            onChange={e => setSizes(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Color</label>
          <select
            value={colors}
            onChange={e => setColors(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a color</option>
            <option value="bg-red-600">Red</option>
            <option value="bg-blue-600">Blue</option>
            <option value="bg-green-600">Green</option>
            <option value="bg-yellow-400">Yellow</option>
            <option value="bg-black">Black</option>
            <option value="bg-white">White</option>
          </select>
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
            sizes: [sizes], // Convert to array
            colors: [colors], // Convert to array
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
