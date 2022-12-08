import { isContract } from "./isContract"

export default function createStrategy(...contracts) {
    contracts.forEach((contract)=>{
        isContract(contract, {throw:true})
    });

    return function strategy({
        action=true,
    }) {
        for (let i = 0; i < contracts.length; i++) {
            if (contracts[i].get() !== contracts[i].shall) {
                if (action) {
                    contracts[i].breach();
                }
                return false;
            }
        }
        return true;
    }
}