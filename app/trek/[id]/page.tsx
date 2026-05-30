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

export default async function TrekDetail({ params }: { params: { id: string } }) {
  try {
    const trek = await db.findOne<ITrek>(TrekCollection, { id: params.id, isActive: true })

    if (!trek) {
      notFound()
    }

    return <TrekDetailClient trek={trek} />
  } catch (error) {
    console.error('Error fetching trek:', error)
    notFound()
  }
}
