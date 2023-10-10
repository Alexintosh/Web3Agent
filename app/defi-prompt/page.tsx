
"use client"; // This is a client component 👈🏽

import React from 'react';
import TabsRequest  from '../components/ui/tabs-request'; // Import the Tabs component without curly braces


export default function Page() {
  


    return (
      <>
            <div className="rounded-lg border bg-background shadow-md">

        <div style={{display:"flex", flexDirection:"column", alignItems:"center",  padding:"20px", border:"10px",borderColor:"green", borderRadius:"10px"}} className='card rounded-none'>
                    {/* <h1 style={ { fontSize: "28px", fontWeight: "bold", marginTop: "5px" } } >Magic space</h1>  */}
                            <h1 className=" text-emerald-700 text-center text-3xl font-black">Magic space</h1> 

            <TabsRequest />
        </div>
        
</div>
      </>
  );
}
