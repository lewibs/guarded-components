import React, { useEffect, useState } from "react";

/**
 * This is a guard. It is used to hide show or manage the state of components.
 * @param {function} strategy a strategy made from createStrategy
 * @param {boolean} hide if this is used then the component responce will hide when the strategies fail
 * @param {*} failHtml this is what is rendered by react and placed as the child of this
 * @param {*} successHtml this is what is rendered when it succeeds
 * @param {*} children this is what is rendered when it succeeds  
 * @returns 
 */
function Guard({strategy, hide=false, failHtml, successHtml, children}) {
    const [ret, setRet] = useState();

    if (successHtml && children) {
        throw new Error("Guard is unable to have successHtml and children components");
    }

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
        
                fullfillsRequirement = false;
                hide = false;
                failHtml = true;
                //if true and true then true
                //if false and true then true
                //if true and false then false
                //if false and false then true
                if (hide === fullfillsRequirement || fullfillsRequirement) {
                    if (fullfillsRequirement === false && failHtml && hide === false) {
                        setRet(failHtml);
                    } else {
                        setRet(successHtml || children);
                    }
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