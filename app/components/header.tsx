'use client'
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */

import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
// import RPC from ".api/ethersRPC"; // for using ethers.js
// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
// Adapters

// import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { useEffect, useState } from "react";

import RPC from "./web3RPC"; // for using web3.js


const clientId = "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io


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
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Balance } from "./balance";
import { NetworkSwitcher } from "./switchNetwork";
import { useAccount, useConnect, useDisconnect } from "wagmi";



export function Header() {
   const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  return (
    <><header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
       
        {isConnected ? (
          <>
            <Sidebar>
              <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
                {/* @ts-ignore */}
                <SidebarList  />
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
         
          { isConnected ? ( <>
        
        
            <NetworkSwitcher />
            <div class="relative inline-flex">
      
    <svg class="w-2 h-2 absolute top-0 right-0 m-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#ffff" fill-rule="nonzero"/></svg>
     
        <select class="border border-green-300 rounded-md text-white h-8 pl-6 pr-10 bg-green-700 hover:border-green-400 focus:outline-none appearance-none">
      
          <option>
                  {/* { address?.substring( 0, 5 ) + "..." } */}
                  {address?.slice(0, 3)}...{address?.slice(-3)}
          </option>
     
      </select>


            </div>


              
             
        <button className="w-32 border rounded-sm hover:bg-green-600 hover:text-white text-green-600 font-semibold p-1"
          onClick={ disconnect as any }>
          Logout
        </button>
        {/* <Balance /> */}
       
      
          </> ) : ( <>
          
          
          { connectors.map( ( connector ) =>
        {
          if ( connector.name == 'Injected' )
          {
            return (
            <button className="w-32 border rounded-sm hover:bg-green-600 hover:text-white text-green-600 font-semibold p-1" key={ connector.id } onClick={ () => connect( { connector } ) }>
              Login
            </button>
          );
          }
          
        })}
        {error && <div>{error.message}</div>}
          </> ) }
          
          {/* {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <div>{unloggedInView}</div>
            <LoginButton showGithubIcon={true} text="Login" />
          )} */}
        </div>
      </div>

    </header>
    

    </>

  )
}