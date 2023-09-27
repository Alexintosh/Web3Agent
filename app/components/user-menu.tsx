'use client'

import Image from 'next/image'
import { type Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/components/ui/dropdown-menu'
import { IconGitHub, IconMessage, IconUser } from './ui/icons'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="">
            {/* {user?.image ? (
              <Image
                className="w-6 h-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 "
                src={user?.image ? `${user.image}&s=60` : ''}
                alt={user.name ?? 'Avatar'}
              />
            ) : (
              <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none h-7 w-7 shrink-0 bg-muted/50 text-muted-foreground">
                {user?.name ? getUserInitials(user?.name) : null}
              </div>
            )} */}
            <IconUser></IconUser>
            <span className="ml-2">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={8}
          align="start"
          className="w-[180px] mr-4"
        >
          <DropdownMenuItem className="flex-col items-start">
            {/* <div className="text-xs cursor-pointer font-medium text-emerald-700">
              {user?.name}
            </div> */}
            <div style={{ display: "flex", flexDirection: "row" }} className="text-xs cursor-pointer text-emerald-700">
              {user?.email}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
            className="text-xs cursor-pointer font-medium hover:text-secondary"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
