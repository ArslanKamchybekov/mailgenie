'use client'
import { INTEGRATION_LIST_ITEMS } from '@/constants/integrations'
import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import IntegrationTrigger from './IntegrationTrigger'

type Props = {
  connections: {
    stripe: boolean
  }
}

const IntegrationsList = ({ connections }: Props) => {
  return (
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items-start gap-x-20">
              <h2 className="font-bold capitalize">{item.name}</h2>
              <IntegrationTrigger
                connections={connections}
                title={item.title}
                descrioption={item.modalDescription}
                name={item.name}
              />
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default IntegrationsList
