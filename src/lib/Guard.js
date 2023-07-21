import React, { useEffect, useState } from "react";

function Guard({strategy, hide=false, failHtml, successHtml, children}) {
    const [ret, setRet] = useState();

    useEffect(()=>{
        if (strategy && !Array.isArray(strategy)) {
            strategy = [strategy];
        } else if (!strategy) {
            strategy = [];
        }

        if (strategy && strategy.length) {
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
                    setRet(successHtml || children);
                } else {
                    setRet(failHtml || undefined);
                }
            })()
        } else if (strategy && strategy.length === 0) { // if there are no strategies we can just skip everything
            setRet(successHtml || children);
        }
    }, [strategy, require, hide]);

    return ret;
}

export default Guard;