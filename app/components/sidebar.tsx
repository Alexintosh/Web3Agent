'use client'

import * as React from 'react'

import { Button } from '@/app/components/ui/button'
import { IconSidebar, IconArrowElbow, MenuIcon } from './ui/icons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/app/components/ui/sheet'

export interface SidebarProps {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <Sheet>
      {/* <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 h-9 w-9 p-0">
          <MenuIcon className="h-7 w-7" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger> */}
      <SheetTrigger asChild>
        <img
          style={{ cursor: 'pointer' }}
          width={'20px'}
          src="https://i.imgur.com/9wk3mGf.png"
        ></img>
      </SheetTrigger>
      <SheetTrigger asChild>
        {/* <Button variant="ghost" className="-ml-2 h-9 w-9 p-0"> */}
        {/* <IconSidebar className="h-6 w-6" /> */}
        {/* <img
            width={'100%'}
            height={'50px'}
            src="https://i.imgur.com/cony151.png"
          ></img>
          <span className="sr-only">Toggle Sidebar</span>
        </Button> */}
        <img
          width={'150px'}
          style={{ cursor: 'pointer' }}
          src="https://i.imgur.com/VfXLfud.png"
        ></img>
      </SheetTrigger>
      <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-sm">Chat History</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
