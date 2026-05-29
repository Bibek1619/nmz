'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type GalleryImage = {
  _id?: string
  title: string
  image: string
  publicId?: string
  description?: string
}

export function GalleryManager() {
  const { toast } = useToast()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newImage, setNewImage] = useState<{
    title: string
    description: string
    file: File | null
    preview: string | null
  }>({
    title: '',
    description: '',
    file: null,
    preview: null,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch gallery images
  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/gallery')
      if (!response.ok) throw new Error('Failed to fetch images')
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error('Error fetching images:', error)
      toast({
        title: 'Error',
        description: 'Failed to load gallery images',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please select an image file',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please select an image smaller than 10MB',
        variant: 'destructive',
      })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewImage({
        ...newImage,
        file,
        preview: reader.result as string,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!newImage.file || !newImage.title) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a title and select an image',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)
    try {
      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', newImage.file)
      formData.append('folder', 'nmz-rahul/gallery')

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) throw new Error('Upload failed')
      const uploadData = await uploadResponse.json()

      // Save to database
      const saveResponse = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newImage.title,
          description: newImage.description,
          image: uploadData.url,
          publicId: uploadData.publicId,
        }),
      })

      if (!saveResponse.ok) throw new Error('Failed to save image')

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      })

      // Reset form
      setNewImage({
        title: '',
        description: '',
        file: null,
        preview: null,
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      // Refresh gallery
      fetchImages()
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Delete failed')

      toast({
        title: 'Success',
        description: 'Image deleted successfully',
      })

      fetchImages()
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gallery Management</h2>

      {/* Upload New Image */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Upload New Image</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">Image Title *</label>
          <Input
            placeholder="e.g., Mountain Sunrise"
            value={newImage.title}
            onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description (Optional)</label>
          <Textarea
            placeholder="Brief description of the image"
            rows={2}
            value={newImage.description}
            onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Image *</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload size={16} className="mr-2" />
            Choose Image File
          </Button>
        </div>

        {/* Image Preview */}
        {newImage.preview && (
          <div className="relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
              <Image
                src={newImage.preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={() => {
                setNewImage({ ...newImage, file: null, preview: null })
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
            >
              <X size={16} />
            </Button>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={uploading || !newImage.file || !newImage.title}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={16} className="mr-2" />
              Upload to Gallery
            </>
          )}
        </Button>
      </Card>

      {/* Gallery Grid */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Current Gallery ({images.length})</h3>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : images.length === 0 ? (
          <Card className="p-12 text-center">
            <ImageIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No images in gallery yet</p>
            <p className="text-sm text-muted-foreground mt-2">Upload your first image above</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <Card key={img._id} className="overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={img.image}
                    alt={img.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold">{img.title}</h4>
                  {img.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {img.description}
                    </p>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDelete(img._id!)}
                  >
                    <X size={14} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
