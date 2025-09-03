"use client"

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import ProductForm from '@/lib/admin-lib/posts/ProductForm'
import { Sidebar } from '@/components/admin/Sidebar/Sidebar'

interface Post {
  id: string;
  title: string;
  status: 'draft' | 'published';
  category: string;
  date: string;
  srcUrl: string;
}

// Sample data - in a real app this would come from an API/database
const samplePosts: Post[] = [
  {
    id: '1',
    title: 'New Summer Collection 2025',
    status: 'published',
    category: 'Fashion',
    date: '2025-08-01',
    srcUrl: '/images/pic1.png',
  },
  {
    id: '2',
    title: 'How to Style Winter Outfits',
    status: 'draft',
    category: 'Style Guide',
    date: '2025-08-15',
    srcUrl: '/images/pic2.png',
  },
  {
    id: '3',
    title: 'Sustainable Fashion Tips',
    status: 'published',
    category: 'Sustainability',
    date: '2025-08-20',
    srcUrl: '/images/pic3.png',
  }
]

interface Props {}

function Page(props: Props) {
    const {} = props
    const [open, setOpen] = useState(false)

    return (
      <main className="grid gap-4 p-4 md:grid-cols-[220px,_1fr] grid-cols-[1fr]">
        <Sidebar />
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Posts</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="flex items-center gap-2">
                  <FiPlus className="w-4 h-4" />
                  New Post
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="max-w-3xl w-full overflow-y-auto max-h-screen">
                <SheetHeader>
                  <SheetTitle>Create New Product</SheetTitle>
                </SheetHeader>
                <ProductForm
                  onCancel={() => {
                    // close sheet by clicking outside or using close button
                  }}
                  onSave={data => {
                    // handle save (e.g., add to posts, API call, etc.)
                  }}
                />
                <SheetFooter />
              </SheetContent>
            </Sheet>
          </div>

          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Image</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Title</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Category</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Status</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Date</th>
                    <th className="text-right px-6 py-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {samplePosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img src={post.srcUrl || '/images/pic1.png'} alt={post.title} className="w-12 h-12 object-cover rounded border" />
                      </td>
                      <td className="px-6 py-4">{post.title}</td>
                      <td className="px-6 py-4">{post.category}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{post.date}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                          <FiEdit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100 text-red-600 hover:text-red-700">
                          <FiTrash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    )
}

export default Page
