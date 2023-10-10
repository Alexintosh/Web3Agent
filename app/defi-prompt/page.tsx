
"use client"; // This is a client component 👈🏽

import React from 'react';
import TabsRequest  from '../components/ui/tabs-request'; // Import the Tabs component without curly braces


export default function Page() {
  


    return (
      <>
      
        <div style={{display:"flex", flexDirection:"column", alignItems:"center",  padding:"20px", border:"10px",borderColor:"green", borderRadius:"10px"}} className='text-lg'>
            <h1 style={{fontSize:"28px", fontWeight:"bold",marginTop:"5px"}} >Magic space</h1> 
            <TabsRequest />
        </div>
        

      </>
  );
}
