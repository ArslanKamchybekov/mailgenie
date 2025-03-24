import React from 'react'
import { cn, extractUUIDFromString } from '@/lib/utils'
import { Bot, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  message: {
    role: 'assistant' | 'user'
    content: string
    link?: string
  }
  createdAt?: Date
}

const Bubble = ({ message, createdAt }: Props) => {
  const d = new Date()
  const image = extractUUIDFromString(message.content)
  console.log(message.link)

  return (
    <div
      className={cn(
        'flex gap-2 items-end',
        message.role == 'assistant' ? 'self-start' : 'self-end flex-row-reverse'
      )}
    >
      {message.role == 'assistant' ? (
        <Bot className="w-5 h-5" />
      ) : (
        <User className="w-5 h-5" />
      )}
      <div
        className={cn(
          'flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md',
          message.role == 'assistant'
            ? 'bg-muted rounded-r-md'
            : 'bg-grandis rounded-l-md'
        )}
      >
        {image ? (
          <div className="relative aspect-square">
            <Image
              src={`https://ucarecdn.com/${image[0]}/`}
              fill
              alt="image"
            />
          </div>
        ) : (
          <p className="text-sm">
            {message.content.replace('(complete)', ' ')}
            {message.link && (
              <Link
                className="underline font-bold pl-2"
                href={message.link}
                target="_blank"
              >
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Bubble
