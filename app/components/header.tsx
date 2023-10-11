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
export function Header() {
  // const session: any = await getServerSession(options)
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client')
    }
  })
  const [web3auth, setWeb3auth] = React.useState<Web3Auth | null>(null);
  const [torusPlugin, setTorusPlugin] = React.useState<TorusWalletConnectorPlugin | null>(null);
  const [provider, setProvider] = React.useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
          // Please remove this parameter if you're on the Base Plan
          uiConfig: {
            appName: "W3A Heroes",
            mode: "light",
            // loginMethodsOrder: ["apple", "google", "twitter"],
            logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 3,
            primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
          },
          web3AuthNetwork: "cyan",
        });

        // plugins and adapters are optional and can be added as per your requirement
        // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

        // adding torus wallet connector plugin

        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#00a8ff" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
        setTorusPlugin(torusPlugin);
        await web3auth.addPlugin(torusPlugin);

        // read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/

        // adding wallet connect v1 adapter
        // const walletConnectV1Adapter = new WalletConnectV1Adapter({
        //   adapterSettings: {
        //     bridge: "https://bridge.walletconnect.org",
        //   },
        //   clientId,
        // });

        // web3auth.configureAdapter(walletConnectV1Adapter);

        // adding wallet connect v2 adapter
        const defaultWcSettings = await getWalletConnectV2Settings(
          "eip155",
          [1],
          "04309ed1007e77d1f119b85205bb779d"
        );
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: { ...defaultWcSettings.adapterSettings },
          loginSettings: { ...defaultWcSettings.loginSettings },
        });

        web3auth.configureAdapter(walletConnectV2Adapter);

        // adding metamask adapter

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x89",
            rpcTarget: "https://rpc-mainnet.matic.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan",
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);

        const torusWalletAdapter = new TorusWalletAdapter({
          clientId,
        });

        // it will add/update  the torus-evm adapter in to web3auth class
        web3auth.configureAdapter(torusWalletAdapter);

        setWeb3auth(web3auth);
        setProvider(web3auth.provider);

        await web3auth.initModal();
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    window.location.reload()
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log({ user })
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    window.location.reload()
  };

  const showWCM = async () => {
    if (!torusPlugin) {
      uiConsole("torus plugin not initialized yet");
      return;
    }
    torusPlugin.showWalletConnectScanner();
    uiConsole();
  };

  const initiateTopUp = async () => {
    if (!torusPlugin) {
      uiConsole("torus plugin not initialized yet");
      return;
    }
    torusPlugin.initiateTopup("moonpay", {
      selectedAddress: "0x8cFa648eBfD5736127BbaBd1d3cAe221B45AB9AF",
      selectedCurrency: "USD",
      fiatValue: 100,
      selectedCryptoCurrency: "ETH",
      chainNetwork: "mainnet",
    });
  };

  const getChainId = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };

  const addChain = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const newChain = {
      chainId: "0x5",
      displayName: "Goerli",
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      tickerName: "Goerli",
      ticker: "ETH",
      decimals: 18,
      rpcTarget: "https://rpc.ankr.com/eth_goerli",
      blockExplorer: "https://goerli.etherscan.io",
    };
    await web3auth?.addChain(newChain);
    uiConsole("New Chain Added");
  };

  const switchChain = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    await web3auth?.switchChain({ chainId: "0x5" });
    uiConsole("Chain Switched");
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const unloggedInView = (
    <button onClick={login} className="card">
      Login NOw
    </button>
  );
  const loggedInView = (
    <>
      <div className="flex flex-col">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={showWCM} className="card">
            Show Wallet Connect Modal
          </button>
        </div>
        <div>
          <button onClick={initiateTopUp} className="card">
            initiateTopUp
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={addChain} className="card">
            Add Chain
          </button>
        </div>
        <div>
          <button onClick={switchChain} className="card">
            Switch Chain
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );
  return (
    <><header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {console.log({ loggedIn })}
        {loggedIn ? (
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
          {loggedIn ?
            <button className="w-32 border rounded-sm hover:bg-red-600 hover:text-white text-red-400 font-semibold p-1" onClick={logout}>Logout</button>
            :
            <button className="w-32 border rounded-sm hover:bg-green-600 hover:text-white text-green-600 font-semibold p-1" onClick={login}>Login</button>
          }
          {/* {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <div>{unloggedInView}</div>
            <LoginButton showGithubIcon={true} text="Login" />
          )} */}
        </div>
      </div>

    </header>
      {/* <div className="flex m-4">{loggedIn ? loggedInView : unloggedInView}</div>*/}
    </>

  )
}