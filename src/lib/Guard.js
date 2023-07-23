import React, { useEffect, useState } from "react";

/**
 * This is a guard. It is used to hide show or manage the state of components.
 * @param {function} strategy a strategy made from createStrategy
 * @param {boolean} hide if this is used then the component responce will hide when the strategies fail
 * @param {*} failHtml this is what is rendered by react and placed as the child of this
 * @param {*} successHtml this is what is rendered when it succeeds
 * @param {*} children this is what is rendered when it succeeds  
 * @param {boolean} log this is to log input just to help with debugging
 * @returns 
 */
function Guard({strategy, hide=false, failHtml, successHtml, children, log}) {
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
                    log && console.log(strategy);

                    fullfillsRequirement = await strategy[i]({action: !hide});
                    if (!fullfillsRequirement) {
                        log && console.log("failed to fullfill requirement");
                        break;
                    }
                }
        
                //if true and true then true
                //if false and true then true
                //if true and false then false
                //if false and false then true
                log && console.log(fullfillsRequirement, hide, successHtml, failHtml, children);
                if (hide === fullfillsRequirement || fullfillsRequirement) {
                    if (fullfillsRequirement === false && failHtml && hide === false) {
                        log && console.log(1, "displaying fail")
                        setRet(failHtml);
                    } else {
                        log && console.log(2, "displaying success")
                        setRet(successHtml || children);
                    }
                } else {
                    log && console.log(3, "displaying fail");
                    setRet(failHtml || undefined);
                }
            })()
        } else if (strategy && strategy.length === 0) { // if there are no strategies we can just skip everything
            log && console.log(4, "displaying success")
            setRet(successHtml || children);
        }
    }, [strategy, require, hide]);

    return ret;
}

export default Guard;