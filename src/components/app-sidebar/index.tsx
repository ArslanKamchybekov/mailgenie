'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SIDE_BAR_MENU } from '@/constants/menu'
import React from "react"
import DomainMenu from "../sidebar/domain-menu"

interface AppSidebarProps {
    domains:
    | {
        id: string
        name: string
        icon: string | null
      }[]
    | null
    | undefined
}   

export function AppSidebar({ domains }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MailGenie</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDE_BAR_MENU.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.path}>
                      {React.createElement(item.icon.type)}
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <DomainMenu domains={domains} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
