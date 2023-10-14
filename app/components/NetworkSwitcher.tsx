"use client"; // This is a client component 👈🏽


import { FC } from 'react';
import { useWeb3Authentication } from '../utility/web3Auth';
// import { useWeb3Authentication } from '../utils/web3Auth';

const NetworkSwitcher: FC = () => {
  const { loading, isConnected, connectToNetwork, disconnect } = useWeb3Authentication();

  return (
    <div>
      {isConnected ? (
        <button onClick={disconnect} disabled={loading}>
          Disconnect
        </button>
      ) : (
        <>
          <button onClick={() => connectToNetwork(1)} disabled={loading}>
            Mainnet
          </button>
          <button onClick={() => connectToNetwork(3)} disabled={loading}>
            Ropsten Testnet
          </button>
          {/* Add more buttons for different networks */}
        </>
      )}
    </div>
  );
};

export default NetworkSwitcher;
