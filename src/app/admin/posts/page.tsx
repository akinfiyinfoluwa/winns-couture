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
import ConfirmModal from '@/lib/admin-lib/posts/DeleteModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Post {
  id: string;
  title: string;
  status: 'draft' | 'published';
  category: string;
  date: string;
  price: string;
  srcUrl: string;
  published: boolean;
}

// Sample data - in a real app this would come from an API/database
const samplePosts: Post[] = [
  {
    id: '1',
    title: 'New Summer Collection 2025',
    status: 'published',
    category: 'Fashion',
    date: '2025-08-01',
    price: '200000',
    srcUrl: '/images/pic1.png',
    published: true
  },
  {
    id: '2',
    title: 'How to Style Winter Outfits',
    status: 'draft',
    category: 'Style Guide',
    date: '2025-08-15',
    price: '200000',
    srcUrl: '/images/pic2.png',
    published: true

  },
  {
    id: '3',
    title: 'Sustainable Fashion Tips',
    status: 'published',
    category: 'Sustainability',
    date: '2025-08-20',
    price: '200000',
    srcUrl: '/images/pic3.png',
    published: true

  }
]

interface Props {}

function Page(props: Props) {
    const {} = props
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState<Post[]>(samplePosts)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [postToDelete, setPostToDelete] = useState<Post | null>(null)
    const [editingPost, setEditingPost] = useState<Post | null>(null)

    const handleDeleteClick = (post: Post) => {
        setPostToDelete(post)
        setIsModalOpen(true)
    }

    const handleConfirmDelete = () => {
        if (postToDelete) {
            setPosts(posts.filter(p => p.id !== postToDelete.id))
            toast.success(`Post "${postToDelete.title}" deleted successfully!`)
            setIsModalOpen(false)
            setPostToDelete(null)
        }
    }

    return (
      <main className="grid gap-4 p-4 md:grid-cols-[220px,_1fr] grid-cols-[1fr]">
        <Sidebar />
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Posts</h1>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button className="flex items-center gap-2" onClick={() => setOpen(true)}>
                  <FiPlus className="w-4 h-4" />
                  New Post
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[90vw] sm:max-w-3xl h-screen p-0"
              >
                <SheetHeader className="p-6 border-b">
                  <SheetTitle>{editingPost ? 'Edit Product' : 'Create New Product'}</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100vh-80px)] p-6 pt-4">
                  <ProductForm
                    onCancel={() => {
                      setOpen(false)
                      setEditingPost(null)
                    }}
                    onSave={data => {
                      if (editingPost) {
                        // Update existing post
                        setPosts(prev => prev.map(post => 
                          post.id === editingPost.id 
                            ? {
                                ...post,
                                title: data.title,
                                category: data.category,
                                srcUrl: data.image instanceof File ? URL.createObjectURL(data.image) : data.image
                              }
                            : post
                        ))
                        toast.success('Product updated successfully!')
                      } else {
                        // Add new post
                        setPosts(prev => [{
                          id: (prev.length + 1).toString(),
                          title: data.title,
                          status: 'draft',
                          category: data.category,
                          date: new Date().toISOString().split('T')[0],
                          price: data.price,
                          srcUrl: data.image instanceof File ? URL.createObjectURL(data.image) : '/images/pic1.png',
                          published: data.published
                        }, ...prev])
                        toast.success('Product created successfully!')
                      }
                      setOpen(false)
                      setEditingPost(null)
                    }}
                    initialData={editingPost ? {
                      title: editingPost.title,
                      category: editingPost.category,
                      image: editingPost.srcUrl,
                      published: editingPost.published
                    } : undefined}
                  />
                </div>
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
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Price</th>
                    <th className="text-right px-6 py-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {posts.map((post) => (
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
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(parseInt(post.price, 10))}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-gray-100"
                          onClick={() => {
                            setEditingPost(post)
                            setOpen(true)
                          }}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100 text-red-600 hover:text-red-700" onClick={() => handleDeleteClick(post)}>
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
        <ConfirmModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Post"
            description="Are you sure you want to delete this post? This action cannot be undone."
        />
        <ToastContainer />
      </main>
    )
}

export default Page
