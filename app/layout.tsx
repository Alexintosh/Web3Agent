"use client"

import './globals.css'
import "./App.css";

import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthProvider'
import { TailwindIndicator } from '@/app/components/tailwind-indicator'
import { Providers } from '@/app/components/providers'
import { Header } from '@/app/components/header'



import { WagmiConfig, createConfig, configureChains, useAccount, useConnect, useDisconnect } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { mainnet, goerli, polygonMumbai, scrollSepolia, scrollTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { NetworkSwitcher } from "../app/components/switchNetwork";
import Web3AuthConnectorInstance from "../app/components/Web3AuthConnectorInstance";
import { Balance } from "../app/components/balance";
import { OperationsProvider } from '@/providers/operations';


const { chains, publicClient, webSocketPublicClient } = configureChains([goerli, polygonMumbai, scrollSepolia, scrollTestnet], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Web3Agent",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "3314f39613059cb687432d249f1658d2",
        showQrModal: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    Web3AuthConnectorInstance(chains) as any,
  ],
  publicClient,
  webSocketPublicClient,
});




const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Web3Agent',
//   description: 'Web3 Agent AI',
// }
export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <WagmiConfig config={config}>
            <AuthProvider>
              <OperationsProvider>
                {/* <Navbar /> */}

                <Header />
                {/* <Profile /> */}
                <main className="flex justify-center items-start p-6 min-h-screen">
                  {children}
                </main>
              </OperationsProvider>
            </AuthProvider>
          </WagmiConfig>
        </Providers>
      </body>
    </html>
  )
}