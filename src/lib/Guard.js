import React, { useEffect, useState } from "react";

function Guard({strategy=[], hide=false, children}) {
    const [ret, setRet] = useState();

    useEffect(()=>{
        if (!Array.isArray(strategy)) {
            strategy = [strategy];
        }

        const fullfillsRequirement = strategy.reduce((state, strategy)=>{
            return state && strategy({action:!hide});
        }, true);

        //if true and true then true
        //if false and true then true
        //if true and false then false
        //if false and false then true
        if (hide === fullfillsRequirement || fullfillsRequirement) {
            setRet(children);
        }
    }, [strategy, require, hide]);

    return ret;
}

export default Guard;