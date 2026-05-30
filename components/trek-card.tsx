'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, TrendingUp, Mountain, DollarSign } from 'lucide-react'

interface TrekCardProps {
  id: string;
  name: string;
  subtext?: string;
  difficulty: string;
  days: string;
  image: string;
  price: string;
  description: string;
  elevation?: string;
}

export function TrekCard({ id, name, subtext, difficulty, days, image, price, description, elevation }: TrekCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-primary mb-1">{name}</h3>
        {subtext && (
          <p className="text-sm text-muted-foreground mb-4">{subtext}</p>
        )}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground/60">Duration</p>
              <p className="font-semibold text-sm">{days}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground/60">Difficulty</p>
              <p className="font-semibold text-sm">{difficulty}</p>
            </div>
          </div>
          {elevation && (
            <div className="flex items-center gap-2">
              <Mountain size={18} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-foreground/60">Height</p>
                <p className="font-semibold text-sm">{elevation}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground/60">Price</p>
              <p className="font-semibold text-sm">{price}</p>
            </div>
          </div>
        </div>
        <Link href={`/treks/${id}`} className="w-full ">
          <Button variant="outline" className="w-full bg-green-600 text-white font-bold">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  )
}
