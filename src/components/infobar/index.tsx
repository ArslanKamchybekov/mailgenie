'use client'

import React from 'react'
import BreadCrumb from './bread-crumb'
import { UserButton, useUser } from '@clerk/nextjs'

const InfoBar = () => {
  return (
    <div className="flex w-full justify-between items-center p-2 mb-8">
      <BreadCrumb />
      <div className="p-4">
        <UserButton />
      </div>
    </div>
  )
}

export default InfoBar
