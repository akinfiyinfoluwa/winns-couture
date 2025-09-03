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
}

const ProductForm: React.FC<ProductFormProps> = ({ onCancel, onSave }) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [discount, setDiscount] = useState<Discount>({ amount: '', percentage: '' })
  const [category, setCategory] = useState('')
  const [sizes, setSizes] = useState('')
  const [colors, setColors] = useState('')
  const [dressStyle, setDressStyle] = useState('')
  const [brand, setBrand] = useState('')
  const [features, setFeatures] = useState<Feature[]>([{ label: '', value: '' }])

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

  const inputClass = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black/20 bg-white'

  return (
    <form className="space-y-5 mt-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <InputGroup.Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter product title"
          className={inputClass}
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
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <InputGroup.Input
            type="number"
            value={rating}
            onChange={e => setRating(e.target.value)}
            placeholder="4.5"
            min={0}
            max={5}
            step={0.1}
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
          <label className="block text-sm font-medium mb-1">Discount Amount</label>
          <InputGroup.Input
            type="number"
            value={discount.amount}
            onChange={e => setDiscount(d => ({ ...d, amount: e.target.value }))}
            placeholder="10"
            min={0}
            className={inputClass}
          />
        </div>
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
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
          <InputGroup.Input
            value={sizes}
            onChange={e => setSizes(e.target.value)}
            placeholder="Small, Medium"
            className={inputClass}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
          <InputGroup.Input
            value={colors}
            onChange={e => setColors(e.target.value)}
            placeholder="bg-red-600, bg-blue-600"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Dress Style</label>
          <InputGroup.Input
            value={dressStyle}
            onChange={e => setDressStyle(e.target.value)}
            placeholder="Casual"
            className={inputClass}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <InputGroup.Input
            value={brand}
            onChange={e => setBrand(e.target.value)}
            placeholder="mystyle-express"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Features</label>
        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <InputGroup.Input
                value={feature.label}
                onChange={e => handleFeatureChange(idx, 'label', e.target.value)}
                placeholder="Label (e.g. Material)"
                className={inputClass + ' w-1/3'}
              />
              <InputGroup.Input
                value={feature.value}
                onChange={e => handleFeatureChange(idx, 'value', e.target.value)}
                placeholder="Value (e.g. 100% Cotton)"
                className={inputClass + ' w-2/3'}
              />
              <Button type="button" size="icon" variant="ghost" onClick={() => removeFeature(idx)} disabled={features.length === 1}>
                <span className="text-lg">&times;</span>
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addFeature} className="mt-2">+ Add Feature</Button>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="button" onClick={() => onSave({ title, image, price, rating, discount, category, sizes, colors, dressStyle, brand, features })}>Save</Button>
      </div>
    </form>
  )
}

export default ProductForm
