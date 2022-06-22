// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {CosmWasmClient} from "cosmwasm";
import {Owners} from "../../types/snapshotTypes";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' })
    return
  }

  try {
    const sg721: string = req.body.sg721
    let owners = []
    const client = await CosmWasmClient.connect("https://rpc.stargaze-apis.com/");
    const numTokens = await client.queryContractSmart(sg721, {num_tokens: {}})
    const contractInfo = await client.queryContractSmart(sg721, {contract_info: {}})

    if (numTokens === 0) {
      res.status(500).json({message: 'None of the tokens have been minted yet.'})
      return
    }

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
    let unique: string[] = []
    owners.forEach((item: Owners) => {
      let i = unique.findIndex(x => (x === item.address));
      if (i <= -1) {
        unique.push(item.address);
      }
      return null;
    });

    res.status(200).json({
      uniqueHolders: unique.length.toString(), name: contractInfo.name,
      numTokens: numTokens.count, owners: owners
    })
    return

  } catch (e: any) {
    res.status(500).json({message: e.message})
    return
  }
}
