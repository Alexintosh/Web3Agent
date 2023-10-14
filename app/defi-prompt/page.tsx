
"use client"; // This is a client component 👈🏽

import React from 'react';
import TabsRequest  from '../components/ui/tabs-request'; // Import the Tabs component without curly braces
import { DefiPromptForm } from '../components/defi-prompt-form';
import { useAccount, useConnect, useDisconnect } from 'wagmi';


export default function Page() {
  
const { address, connector, isConnected } = useAccount();
 

    return (
      <>
            { isConnected ? ( <>
             <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
                <div className="mx-auto sm:max-w-2xl sm:px-4">
                    <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                            <DefiPromptForm
                                onSubmit={async value => {
                                await append({
                                    
                                    content: value,
                                    role: 'user'
                                },
                                    { functions: functionSchemas })
                                }}
                            
                            />
                    </div>
                </div>
        </div>
            
            </> ) : ( <>
            
            
            <h1>Please login</h1>
            
            
            </> ) }
       

      </>
  );
}
