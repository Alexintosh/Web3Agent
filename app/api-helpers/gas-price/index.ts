import { getChainData, payloadId } from '@/app/api-helpers/chain';
import axios from 'axios';
import { convertHexToString, convertStringToNumber } from '../formatters';

export const rpcGetGasFee = async (chainId: number) => {
    const rpcUrl = getChainData(chainId).rpc_url;

    if (!rpcUrl && typeof rpcUrl !== "string") {
        throw new Error("Invalid or missing rpc url");
    }

    const response = await axios.post(rpcUrl, {
        jsonrpc: "2.0",
        id: payloadId(),
        method: "eth_gasPrice",
        params: [],
    });
    console.log("response.data.result=>", response.data.result)
    return response;

};