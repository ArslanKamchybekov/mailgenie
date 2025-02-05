import React from 'react'
import BreadCrumb from './bread-crumb'
import { Card } from '../ui/card'
import { Star, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const InfoBar = () => {
  return (
    <div className="flex w-full justify-between items-center p-2 mb-8">
      <BreadCrumb />
      <div className="flex gap-3 items-center p-2">
        <div>
          <Card className="rounded-xl flex gap-3 py-3 px-4 text-ghost">
            <Trash />
            <Star></Star>
          </Card>
        </div>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default InfoBar
