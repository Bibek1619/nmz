'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Upload, Loader2, Bold, Italic, List, Heading } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type BlogItem = {
  id: string
  title: string
  subtext: string
  category: string
  content: string
  coverImage?: string
  featured?: boolean
  published?: boolean
}

interface BlogEditorProps {
  blog: BlogItem | null
  onSave: (blog: BlogItem) => void
  onCancel: () => void
}

export function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(blog?.coverImage || null)
  
  const [formData, setFormData] = useState<BlogItem>(
    blog || {
      id: '',
      title: '',
      subtext: '',
      category: '',
      content: '',
      coverImage: '',
      featured: false,
      published: false,
    }
  )

  const updateField = (field: keyof BlogItem, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  // Insert formatting at cursor position
  const insertFormatting = (before: string, after: string = '') => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = formData.content
    const selectedText = text.substring(start, end)

    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
    updateField('content', newText)

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  // Formatting helpers
  const makeBold = () => insertFormatting('**', '**')
  const makeItalic = () => insertFormatting('*', '*')
  const makeHeading = () => {
    const textarea = contentRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const text = formData.content
    const lineStart = text.lastIndexOf('\n', start - 1) + 1
    const newText = text.substring(0, lineStart) + '## ' + text.substring(lineStart)
    updateField('content', newText)
  }
  const makeBulletPoint = () => {
    const textarea = contentRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const text = formData.content
    const lineStart = text.lastIndexOf('\n', start - 1) + 1
    const newText = text.substring(0, lineStart) + '• ' + text.substring(lineStart)
    updateField('content', newText)
  }

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please select an image file',
        variant: 'destructive',
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please select an image smaller than 10MB',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('folder', 'nmz-rahul/blog')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()

      updateField('coverImage', data.url)
      setImagePreview(data.url)
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      })
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

  const removeImage = () => {
    updateField('coverImage', '')
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSave = () => {
    if (!formData.id || !formData.title || !formData.category) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in ID, Title, and Category',
        variant: 'destructive',
      })
      return
    }
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID (URL) *</label>
            <Input
              placeholder="e.g., altitude-sickness-guide"
              value={formData.id}
              onChange={(e) => updateField('id', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <Input
              placeholder="e.g., Health & Safety, Trek Tips"
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Headline (Title) *</label>
          <Input
            placeholder="e.g., Understanding Altitude Sickness"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subtext (Short Description)</label>
          <Input
            placeholder="Brief description that supports the headline"
            value={formData.subtext}
            onChange={(e) => updateField('subtext', e.target.value)}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image (Optional)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {imagePreview ? (
            <div className="relative">
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <Image
                  src={imagePreview}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
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
                  Choose Cover Image
                </>
              )}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured || false}
            onChange={(e) => updateField('featured', e.target.checked)}
            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
          />
          <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
            Feature this blog on homepage
          </label>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <input
            type="checkbox"
            id="published"
            checked={formData.published || false}
            onChange={(e) => updateField('published', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="published" className="text-sm font-medium cursor-pointer">
            Publish this blog (make it visible)
          </label>
        </div>
      </Card>

      {/* Rich Content Editor */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Blog Content</h3>
        
        {/* Formatting Toolbar */}
        <div className="flex gap-2 p-2 bg-muted/50 rounded-lg flex-wrap">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={makeHeading}
            title="Heading (##)"
          >
            <Heading size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={makeBold}
            title="Bold (**text**)"
          >
            <Bold size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={makeItalic}
            title="Italic (*text*)"
          >
            <Italic size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={makeBulletPoint}
            title="Bullet Point (•)"
          >
            <List size={16} />
          </Button>
        </div>

        {/* Content Textarea */}
        <div>
          <Textarea
            ref={contentRef}
            rows={20}
            placeholder="Write your blog content here...

Example formatting:
## Symptoms of Altitude Sickness
• Headache
• Nausea and vomiting
• Dizziness

## Prevention Tips
**1. Acclimatization** - Take time to adjust to high altitudes gradually.
*Important:* Ascend slowly and take rest days."
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Use ## for headings, **text** for bold, *text* for italic, • for bullet points
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
        <Button className="flex-1" onClick={handleSave}>
          Save Blog
        </Button>
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
