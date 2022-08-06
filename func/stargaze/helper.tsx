import {CosmWasmClient} from "cosmwasm";
import {Owner} from "../../types/snapshotTypes";

export const getCollectionInfo = async (sg721: string, mainnet: boolean) => {
    try {
        const client = await CosmWasmClient.connect(
            `${ mainnet ? "https://rpc.stargaze-apis.com/" : "https://rpc.elgafar-1.stargaze-apis.com/"}`
        );
        const numTokens = await client.queryContractSmart(sg721, {num_tokens: {}})
        const contractInfo = await client.queryContractSmart(sg721, {contract_info: {}})
        return {
            name: contractInfo.name, numTokens: numTokens.count, success: true
        }
    } catch (e: any) {
        return { message: e.message, success: false }
    }
}

export const grabSnapshot = async (sg721: string) => {
    try {
        const client = await CosmWasmClient.connect("https://rpc.stargaze-apis.com/");
        const numTokens = await client.queryContractSmart(sg721, {num_tokens: {}})
        const contractInfo = await client.queryContractSmart(sg721, {contract_info: {}})

        if (numTokens === 0) {
            return { message: 'None of the tokens have been minted yet.', success: false }
        }

        let owners: Owner[] = [];

        for (let i = 1; i <= numTokens.count; i++) {
            try {
                const tmp = await client.queryContractSmart(sg721, {
                    owner_of: {
                        token_id: i.toString()
                    },
                })
                owners.push({
                    token_id: i.toString(),
                    address: tmp.owner
                })
            } catch (e: any) {
                console.log(e.message)
            }
        }

        // Grab unique owners
        let unique: Owner[] = []
        owners.forEach((item: Owner) => {
            let i = unique.findIndex(x => (x.address === item.address));
            if (i <= -1) {
                unique.push(item);
            }
            return null;
        });

        return {
            uniqueHolders: unique, name: contractInfo.name,
            numTokens: numTokens.count, owners: owners, ownersToExport: owners, success: true
        }

    } catch (e: any) {
        return { message: e.message, success: false }
    }
}