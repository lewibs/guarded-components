import React, { useEffect, useState } from "react";

function Guard({strategy=[], hide=false, children}) {
    const [ret, setRet] = useState();

    useEffect(()=>{
        (async ()=>{
            if (!Array.isArray(strategy)) {
                strategy = [strategy];
            }
    
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
    }, [strategy, require, hide]);

    return ret;
}

export default Guard;