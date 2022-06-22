import axios from "axios";

export const grabSnapshot = async (sg721: string) => {
    return await axios.post('/api/snapshot', {
        sg721: sg721,
    })
}