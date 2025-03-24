import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/use-chat-context'
import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return (
    <SidebarProvider>
      <ChatProvider>
        <div className="flex h-screen w-full">
          <AppSidebar domains={authenticated.domain} />
          {/* <SideBar domains={authenticated.domain} /> */}
          <SidebarTrigger />
          <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
            {children}
          </div>
        </div>
      </ChatProvider>
    </SidebarProvider>
  )
}

export default OwnerLayout
