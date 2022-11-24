import {SecretNetworkClient, MsgExecuteContract} from "secretjs"
import { Contract } from "../../types/bot";

const SCRT_GRPC_URL = "https://secret-4.api.trivium.network:9091"
const SCRT_CHAIN_ID="secret-4"
const BACKEND_ADDRESS = "secret1m4k46qcr209nqpgj8x8gy9sgfmadymj0ulgvh0"

export const setWhitelist = async (client: SecretNetworkClient, contract: Contract) => {
    const whitelistTx = new MsgExecuteContract({
        sender: client.address,
        contractAddress: contract.address,
        codeHash: contract.hash,
        msg: {
            set_whitelisted_approval: {
                address: BACKEND_ADDRESS,
                view_owner: "all"
            }
        }
    })
    let response = await client.tx.broadcast([whitelistTx],
        {
            gasLimit: 150_000
        }
    )
    if(response.code === 0){
        return response
    } else {
        return undefined
    }
}

const getAddress = async () => {
    // @ts-ignore
    const keplrOfflineSigner = window.getOfflineSignerOnlyAmino(SCRT_CHAIN_ID);
    const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts()
    return myAddress
}

export const getClient = async () => {
    try {
        // @ts-ignore
        await window.keplr.enable(SCRT_CHAIN_ID)
        const myAddress = await getAddress()
        return await SecretNetworkClient.create({
            grpcWebUrl: SCRT_GRPC_URL,
            chainId: SCRT_CHAIN_ID, // @ts-ignore
            wallet: window.getOfflineSignerOnlyAmino(SCRT_CHAIN_ID),
            walletAddress: myAddress, // @ts-ignore
            encryptionUtils: window.getEnigmaUtils(SCRT_CHAIN_ID),
        })
    } catch (e: any) {
        console.error(e.message)
        return undefined
    }


}

export const getPermit = async () => {
    const myAddress = await getAddress()

    // @ts-ignore
    return await window.keplr.signAmino(
        SCRT_CHAIN_ID,
        myAddress,
        {
            chain_id: SCRT_CHAIN_ID,
            account_number: "0",
            sequence: "0",
            fee: {
                amount: [{ denom: "uscrt", amount: "0" }],
                gas: "1",
            },
            msgs: [
                {
                    type: "link-discord",
                    value: "This is a signature request. Accepting this request will allow us to verify ownership of your NFTs. " +
                        "In addition, you will need to accept a transaction that enables our Discord bot to view all of the NFTs in your inventory." +
                        "\nWARNING: Your Discord username and Secret address is encrypted and stored in our database. " +
                        "If the decryption key is compromised, your wallet address, Discord username and token IDs can be linked together."
                },
            ],
            memo: "Created by @KevinAKidd :)",
        },
        {
            preferNoSetFee: true, // Fee must be 0, so hide it from the user
            preferNoSetMemo: false,
        }
    )
}