import { Fragment, useState } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const NetworkSwitcher = () => {
  const { chain } = useNetwork()
  const { chains, error, pendingChainId, switchNetwork, status } =
    useSwitchNetwork()

  const [selectedNetwork, setSelectedNetwork] = useState(chain?.id || '')

  const handleNetworkChange = (e) => {
    const selectedNetworkId = e.target.value;
    setSelectedNetwork(selectedNetworkId);
    switchNetwork(selectedNetworkId);
  };

  return (
    <div>
      {chain && <div>Using {chain.name}</div>}

      <select onChange={handleNetworkChange} value={selectedNetwork}>
        {chains.map((x) => (
          <option key={x.id} value={x.id} disabled={!switchNetwork || x.id === chain?.id}>
            {x.id === chain?.id ? `Current Network: ${x.name}` : x.name}
            {status === 'loading' && x.id === pendingChainId && '…'}
          </option>
        ))}
      </select>

      <div>{error && (error?.message ?? 'Failed to switch')}</div>
    </div>
  )
}
