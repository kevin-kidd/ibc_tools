import {CosmWasmClient} from "cosmwasm";
import {Owner} from "../../types/snapshot";

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
        const contractInfo = await client.queryContractSmart(sg721, {contract_info: {}});
        const minterResponse = await client.queryContractSmart(sg721, { minter: {}});
        const configResponse = await client.queryContractSmart(minterResponse.minter, { config: {} });

        let numTokens = configResponse.num_tokens;
        if (numTokens === 0) {
            return { message: 'Could not find any tokens in the collection.', success: false }
        }

        console.log(numTokens);

        let owners: Owner[] = [];
        for (let i = 1; i <= numTokens; i++) {
            try {
                const ownerOfToken = await client.queryContractSmart(sg721, {
                    owner_of: {
                        token_id: i.toString()
                    },
                })
                owners.push({
                    token_id: i.toString(),
                    address: ownerOfToken.owner
                })
            } catch (e: any) {
                if(!e.message.includes("not found")) console.error(e.message);
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
            numTokens: owners.length.toString(), owners: owners, ownersToExport: owners, success: true
        }

    } catch (e: any) {
        return { message: e.message, success: false }
    }
}