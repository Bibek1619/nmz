'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Star, Upload, X, Loader2, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { IReview } from '@/models/Review'
import { Footer } from '@/components/footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

interface ReviewsClientProps {
  initialReviews: IReview[]
}

export default function ReviewsClient({ initialReviews }: ReviewsClientProps) {
  const { toast } = useToast()
  const [showDialog, setShowDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    trekName: '',
    rating: 5,
    comment: '',
    images: [] as string[],
  })

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploadingImages(true)
    try {
      const uploadedUrls: string[] = []

      for (let i = 0; i < Math.min(files.length, 5); i++) {
        const file = files[i]
        
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid File',
            description: `${file.name} is not an image`,
            variant: 'destructive',
          })
          continue
        }

        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: 'File Too Large',
            description: `${file.name} is larger than 10MB`,
            variant: 'destructive',
          })
          continue
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'nmz-rahul/reviews')

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) throw new Error('Upload failed')

        const data = await response.json()
        uploadedUrls.push(data.url)
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }))

      toast({
        title: 'Success',
        description: `${uploadedUrls.length} image(s) uploaded`,
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload images',
        variant: 'destructive',
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.address || !formData.trekName || !formData.comment) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit review')

      toast({
        title: 'Review Submitted!',
        description: 'Your review is pending approval and will be visible soon.',
      })

      setShowDialog(false)
      setFormData({
        fullName: '',
        address: '',
        trekName: '',
        rating: 5,
        comment: '',
        images: [],
      })
    } catch (error) {
      console.error('Submit error:', error)
      toast({
        title: 'Error',
        description: 'Failed to submit review',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const stats = [
    { label: 'Happy Trekkers', value: '500+' },
    { label: 'Average Rating', value: '5.0 ⭐' },
    { label: 'Total Reviews', value: initialReviews.length },
    { label: 'Repeat Customers', value: '80%' },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-4 pb-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Reviews</span>
          </nav>
          <h1 className="text-4xl font-bold text-center text-primary bg-gradient-to-br from-primary/10 to-accent/10">Trekker Reviews</h1>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add Review Button */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <Button
            onClick={() => setShowDialog(true)}
            className="gap-2"
            size="lg"
          >
            <Plus size={20} />
            Add Your Review
          </Button>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {initialReviews.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {initialReviews.map((review, index) => (
                <motion.div
                  key={review._id?.toString()}
                  variants={fadeInUp}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-foreground">{review.fullName}</p>
                        <p className="text-sm text-foreground/60">{review.address}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        {review.images.slice(0, 4).map((img, i) => (
                          <div key={i} className="relative h-24 rounded overflow-hidden">
                            <Image
                              src={img}
                              alt={`Review image ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mb-4 flex-1">
                      <p className="text-sm font-medium text-primary mb-2">{review.trekName}</p>
                      <p className="text-foreground/80 leading-relaxed text-sm">&quot;{review.comment}&quot;</p>
                    </div>
                    
                    <p className="text-xs text-foreground/50">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Add Review Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Share Your Trek Experience</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name *</label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Address/Location *</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Trek Name *</label>
              <Input
                value={formData.trekName}
                onChange={(e) => setFormData({ ...formData, trekName: e.target.value })}
                placeholder="e.g., Annapurna Base Camp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={rating <= formData.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Your Review *</label>
              <Textarea
                rows={5}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Share your experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Add Photos (Optional, max 5)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
              />
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative h-24 rounded overflow-hidden">
                      <Image
                        src={img}
                        alt={`Upload ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {formData.images.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImages}
                >
                  {uploadingImages ? (
                    <Loader2 className="animate-spin mr-2" size={16} />
                  ) : (
                    <Upload className="mr-2" size={16} />
                  )}
                  {uploadingImages ? 'Uploading...' : 'Upload Photos'}
                </Button>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full"
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  )
}
