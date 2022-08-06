import {FunctionComponent, useEffect, useState} from "react";
import {Recipient, StateProps} from "../../../types/airdropTypes";
import { MsgExecuteContractEncodeObject, coin, GasPrice } from "cosmwasm";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { toUtf8 } from '@cosmjs/encoding';

const AIRDROP_FEE = coin(0, 'ustars')
const funds = parseInt(AIRDROP_FEE.amount) == 0 ? [] : [AIRDROP_FEE]

const AirdropCard: FunctionComponent<StateProps> = ({ state, setState }) => {

    const txAmount = Math.ceil(state.airdropList.length / 500);
    const [currentTx, setCurrentTx] = useState<number>(1);
    const [remainingNFTs, setRemainingNFTs] = useState<number>(state.airdropList.length);
    const [connected, setConnected] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [transactions, setTransactions] = useState<Recipient[][]>([]);
    const [client, setClient] = useState<SigningCosmWasmClient>();

    const execTransaction = async () => {
        if(client === undefined) { setConnected(false); return }
        let executeContractMsgs: MsgExecuteContractEncodeObject[] = [];
        for(const transaction of transactions[currentTx - 1]){
            const msg = { mint_to: { recipient: transaction.address } }
            const executeContractMsg: MsgExecuteContractEncodeObject = {
                typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
                value: MsgExecuteContract.fromPartial({
                    sender: address,
                    contract: state.contractAddress,
                    msg: toUtf8(JSON.stringify(msg)),
                    funds,
                }),
            }
            executeContractMsgs.push(executeContractMsg)
        }
        try {
            const transaction = await client.signAndBroadcast(
                address,
                executeContractMsgs,
                'auto',
                'batch airdrop - https://tools.ibcnfts.com/stargaze/airdrop'
            )
            if(transaction.code === 0) {
                if(currentTx === txAmount) {
                    setState({alertMsg: `The airdrop is complete! 🎉`, alertSeverity: "success"});
                } else {
                    setState({alertMsg: `Transaction #${currentTx} successfully completed.`, alertSeverity: "success"});
                    setCurrentTx(currentTx + 1);
                }
                setRemainingNFTs(remainingNFTs - executeContractMsgs.length);
            }
        } catch (e: any) {
            console.error(e);
            if(e.message === "Failed to retrieve account from signer") {
                setState({ alertMsg: "Failed to retrieve account from signer. Please reconnect Keplr and try again.", alertSeverity: "error" });
            }
            if(e.message.includes("Sender is not an admin")) setState({ alertMsg: "You do not have permission to mint from this contract.", alertSeverity: "error" });
            else setState({ alertMsg: e.message, alertSeverity: "error" });
        }
    }

    let connectKeplr: () => Promise<boolean>;
    connectKeplr = async () => {
        let success: boolean;
        try {
            let rpcEndpoint: string, chainId: string;
            if(state.mainnet) { rpcEndpoint = "https://rpc.stargaze-apis.com/"; chainId = "stargaze-1" }
            else { rpcEndpoint = "https://rpc.elgafar-1.stargaze-apis.com/"; chainId = "elgafar-1" }

            // @ts-ignore
            if (!window.keplr) {
                setState({ alertMsg: "Unable to detect the Keplr extension.", alertSeverity: "error" });
                return false;
            }

            // @ts-ignore
            await window.keplr.enable(chainId).catch(() => {
                setState({ alertMsg: `Unable to connect to the chain: ${chainId}`, alertSeverity: "error" });
                return false;
            });

            // @ts-ignore
            const offlineSigner = await window.getOfflineSignerAuto(chainId);
            const accounts = await offlineSigner.getAccounts();
            const signingClient = await SigningCosmWasmClient.connectWithSigner(
                rpcEndpoint,
                offlineSigner,
                {
                    prefix: "wasm", // @ts-ignore
                    gasPrice: GasPrice.fromString("1000ustars")
                }
            );
            setAddress(accounts[0].address);
            setClient(signingClient);
            localStorage.setItem('connected', 'true');
            success = true;
            setConnected(true);
        } catch (e) {
            console.error(e);
            setState({ alertMsg: "Failed to connect to Keplr.", alertSeverity: "error" });
            return false;
        }
        if (success) {
            let newTransactions: Recipient[][] = [];
            for (let i = 1; i <= txAmount; i++) {
                const bounds = [(i - 1) * 500, i * 500];
                const transaction: Recipient[] = state.airdropList.slice(bounds[0], bounds[1]);
                console.log(transaction);
                newTransactions.push(transaction);
            }
            setTransactions(newTransactions);
        }
        return true;
    };

    useEffect(() => {
        if(!connected && localStorage.getItem("connected") !== null) {
            connectKeplr().then(() => console.log("Connected"));
        }
    }, [connectKeplr, connected]);

    return (
        <div className="mx-auto main-card w-full pt-10 px-4">
            <p className="text-xl truncate pl-4 mb-1">Airdrop Details</p>
            <ul className="list-disc px-8">
                <li>Connect to Keplr and accept the popup window.</li>
                {
                    txAmount > 1 ?
                        <>
                            <li>Airdropping more than 500 tokens require multiple transactions.</li>
                            <li>{`You will need to complete ${txAmount} transactions to airdrop ${state.airdropList.length} NFTs.`}</li>
                        </>
                        :
                        <li>You will need to complete 1 transaction to airdrop {state.airdropList.length} NFTs.</li>
                }
            </ul>
            <div className="m-4 mb-0 border-[#d4d1ce] border" />
            <div className="md:text-lg text-sm font-medium text-[#686765] md:mx-6 mt-1 flex justify-between">
                <p>Transaction<a className="font-bold pl-2">{currentTx.toString()} / {txAmount.toString()}</a></p>
                <p>{remainingNFTs.toString()} NFTs remaining</p>
            </div>
            {
                connected ?
                    null :
                    <div className="flex justify-center mt-10">
                        <button onClick={connectKeplr} className="px-4 py-2 bg-[#85f0ff] button-dropshadow text-black font-bold">
                            Connect Keplr
                        </button>
                    </div>
            }
            <div className="mt-6 mx-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {
                    transactions.map((tx, index) => (
                        <button
                            key={`tx-button-${index}`} disabled={index + 1 !== currentTx || remainingNFTs === 0}
                            onClick={execTransaction}
                            className={`px-4 py-2 bg-[#fff985] button-dropshadow text-black font-bold 
                                ${
                                    index + 1 < currentTx ? "bg-[#85ff89]" : null
                                }
                                ${
                                    remainingNFTs === 0 ? "bg-[#85ff89]" : null
                                }
                                ${
                                    index + 1 > currentTx ? "bg-[#d4d1ce]" : null
                                }
                            `}
                        >
                            Exec Transaction #{index + 1}
                        </button>
                    ))
                }
            </div>
            <div className="flex justify-end mt-10 pb-2">
                <p className="text-[#686765] text-lg mr-2">Step 4</p>
            </div>
        </div>
    )
}

export default AirdropCard