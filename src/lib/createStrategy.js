import { isContract } from "./isContract"

export default function createStrategy(...contracts) {
    contracts.forEach((contract)=>{
        isContract(contract, {throw:true})
    });

    return async function strategy({
        action=true,
    }) {
        for (let i = 0; i < contracts.length; i++) {
            if (await contracts[i].get() !== contracts[i].shall) {
                if (action) {
                    await contracts[i].breach();
                }
                return false;
            }
        }
        return true;
    }
}