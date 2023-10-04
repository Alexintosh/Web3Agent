import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/app/lib/utils'
// import { auth } from '@/auth'
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { clearChats } from '@/app/actions'
import { buttonVariants } from '@/app/components/ui/button'
import { Sidebar } from '@/app/components/sidebar'
import { SidebarList } from '@/app/components/sidebar-list'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator
} from '@/app/components/ui/icons'
import { SidebarFooter } from '@/app/components/sidebar-footer'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { ClearHistory } from '@/app/components/clear-history'
import { UserMenu } from '@/app/components/user-menu'
import { LoginButton } from '@/app/components/login-button'

export async function Header() {
  const session: any = await getServerSession(options)
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <Sidebar>
              <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
                {/* @ts-ignore */}
                <SidebarList userId={session?.user?.email} />
              </React.Suspense>
              <SidebarFooter>
                <ThemeToggle />
                <ClearHistory clearChats={clearChats} />
              </SidebarFooter>
            </Sidebar>
            <Link href={'/defi-prompt'} className='text-green-600 font-semibold'>
              Defi Prompt
            </Link>
          </>
        ) : (
          <Link href="/">
            <div style={{ display: "flex" }}>
              <img
                width={'130px'}
                style={{ cursor: 'pointer' }}
                src="https://i.imgur.com/VfXLfud.png"
              ></img>
            </div>

          </Link>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex items-center">
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <LoginButton showGithubIcon={true} text="Login" />
          )}
        </div>
      </div>
    </header>
  )
}