# WEB3AGENT

## Getting Started

First, run the development server:
Use Node v18
```bash
npm i
npm run dev
```

### ENV Vairables
```
COINGECKO_BASE_URL=xxxxxxxxxxxxxx
INFURA_API_KEY=xxxxxxxxxxxxxx
NFT_STORAGE_API_KEY=xxxxxxxxxxxxxx
ETHEREUM_EXPLORER_API_KEY=xxxxxxxxxxxxxx
DEPLOYER_PRIVATE_KEY=xxxxxxxxxxxxxx
NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY=xxxxxxxxxxxxxx
KV_REST_API_READ_ONLY_TOKEN=xxxxxxxxxxxxxx
KV_REST_API_TOKEN=xxxxxxxxxxxxxx
KV_REST_API_URL=xxxxxxxxxxxxxx
KV_URL=xxxxxxxxxxxxxx
OPENAI_API_KEY=xxxxxxxxxxxxxx
NODE_ENV=xxxxxxxxxxxxxx
JWT_SECRET=xxxxxxxxxxxxxx
NEXT_PUBLIC_NFT_STORAGE_API_KEY=xxxxxxxxxxxxxx
NEXT_PUBLIC_ALCHEMY_KEY=xxxxxxxxxxxxxx
NEXT_PUBLIC_INFURA_API_KEY=v
MONGODB_URI=xxxxxxxxxxxxxx
```


### Tableland
We have used Table to store CID of chat backup. Each user will have thier own table.
[Link](https://github.com/Web3-Agent/Web3Agent/blob/feaa1f8e76eca83dd2f6a54aaf4647b2189aa92a/app/manage-history/page.tsx#L25)

### Support Chain for Contract Deployment
- [Scroll Sepolia Testnet](https://github.com/Web3-Agent/Web3Agent/blob/feaa1f8e76eca83dd2f6a54aaf4647b2189aa92a/app/lib/chains.json#L126)
- [Goerli](https://github.com/Web3-Agent/Web3Agent/blob/feaa1f8e76eca83dd2f6a54aaf4647b2189aa92a/app/lib/chains.json#L160)
- [Filecoin - Calibration testnet](https://github.com/Web3-Agent/Web3Agent/blob/feaa1f8e76eca83dd2f6a54aaf4647b2189aa92a/app/lib/chains.json#L19524)


### Contract Deployment Commands
```
write a simple contract that stores a value.
Deploy this contract on Scroll Sepolia Testnet
Deploy this contract on  goerli
Deploy this contract on Filecoin - Calibration testnet
```
### Other Commands
```
1.Get Account Balance for account is __YOUR_ACCOUNT__ADDRESS__ and chain id is 1.
2.Get Transaction information, where transaction hash is __TXN_HASH__ and chain id is 1.
3.give me current block number on chain 1
4.give me gas price of chain id 1 
5.give me gas price of Ethereum.
  ```