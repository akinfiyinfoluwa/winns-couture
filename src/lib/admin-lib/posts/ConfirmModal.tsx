import React from 'react'
import { Button } from '@/components/ui/button'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm, title, description }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 pointer-events-none">
      <div className="bg-white rounded-lg border shadow-2xl px-5 py-4 flex flex-col gap-2 min-w-[260px] max-w-[320px] mt-24 pointer-events-auto">
        <h2 className="text-base font-semibold mb-1">{title || 'Are you sure?'}</h2>
        {description && <p className="mb-2 text-gray-600 text-xs">{description}</p>}
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" size="sm" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
