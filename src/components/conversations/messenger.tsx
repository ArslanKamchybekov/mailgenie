'use client'
import { useChatWindow } from '@/hooks/conversation/use-conversation'
import React from 'react'
import { Loader } from '../loader'
import Bubble from '../chatbot/bubble'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowUp, MessagesSquare } from 'lucide-react'

const Messenger = () => {
  const {
    messageWindowRef,
    chats,
    loading,
    chatRoom,
    onHandleSentMessage,
    register,
  } = useChatWindow()
  return (
    <div className="flex-1 flex flex-col h-0 relative">
      <div className="flex-1 h-0 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="w-full flex-1 h-0 flex flex-col gap-3 pl-5 py-5 chat-window overflow-y-auto"
          >
            {chats.length ? (
              chats.map((chat) => (
                <Bubble
                  key={chat.id}
                  message={{
                    role: chat.role!,
                    content: chat.message,
                  }}
                  createdAt={chat.createdAt}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <MessagesSquare className="w-24 h-24 text-gray-300 mb-2"/>
                <p className="text-sm text-gray-300">
                  No messages yet
                </p>
              </div>
            )}
          </div>
        </Loader>
      </div>
      <form
        onSubmit={onHandleSentMessage}
        className="flex px-3 pt-3 pb-10 flex-col backdrop-blur-sm bg-muted w-full"
      >
        <div className="flex justify-between">
          <Input
            {...register('content')}
            placeholder="Type your message..."
            className="rounded-lg focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-muted outline-none border-none"
          />
          <Button
            className='rounded-lg'
            type="submit"
            disabled={!chatRoom}
          >
            <ArrowUp size={24} />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Messenger
