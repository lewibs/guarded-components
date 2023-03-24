import React, { useEffect, useState } from "react";

function Guard({strategy=[], hide=false, children}) {
    const [ret, setRet] = useState();

    useEffect(()=>{
        if (!Array.isArray(strategy)) {
            strategy = [strategy];
        }

        if (strategy.length) {
            (async ()=>{
                let fullfillsRequirement;
                for (let i = 0; i < strategy.length; i++) {
                    fullfillsRequirement = await strategy[i]({action: !hide});
    
                    if (!fullfillsRequirement) {
                        break;
                    }
                }
        
                //if true and true then true
                //if false and true then true
                //if true and false then false
                //if false and false then true
                if (hide === fullfillsRequirement || fullfillsRequirement) {
                    setRet(children);
                } else {
                    setRet(undefined);
                }
            })()
        } else { // if there are no strategies we can just skip everything
            setRet(children);
        }
    }, [strategy, require, hide]);

    return ret;
}

export default Guard;