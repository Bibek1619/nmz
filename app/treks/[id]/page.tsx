import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { ITrek, TrekCollection } from '@/models/Trek'
import TrekDetailClient from './TrekDetailClient'

// Generate static params for all treks
export async function generateStaticParams() {
  try {
    const treks = await db.findAll<ITrek>(TrekCollection, { isActive: true })
    return treks.map((trek) => ({
      id: trek.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Revalidate every hour
export const revalidate = 3600

export default async function TrekDetail({ params }: { params: Promise<{ id: string }> }) {
  try {
    // Await params in Next.js 15+
    const { id } = await params
    
    console.log('Fetching trek with id:', id)
    
    // Try to find the trek
    const trek = await db.findOne<ITrek>(TrekCollection, { id, isActive: true })
    
    console.log('Trek found:', trek ? 'Yes' : 'No')
    
    if (!trek) {
      console.log('Trek not found, checking all treks...')
      const allTreks = await db.findAll<ITrek>(TrekCollection)
      console.log('Total treks in database:', allTreks.length)
      console.log('Trek IDs:', allTreks.map(t => t.id))
      notFound()
    }

    return <TrekDetailClient trek={trek} />
  } catch (error) {
    console.error('Error fetching trek:', error)
    notFound()
  }
}
