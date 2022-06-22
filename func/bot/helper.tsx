import axios from "axios";

export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const postData = async (permit: any, discord: string, address: string, contract: string) => {
    return await axios.post("https://api.ibcnfts.com/add_discord", {
        address: address,
        signature: permit,
        discord: discord,
        contract_addr: contract
    })
}