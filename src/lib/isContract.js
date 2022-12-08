import { makeDuck, duckfaults, Any } from "ducktyper";

const isFunction = makeDuck(Function);

const isShall = duckfaults(makeDuck(Any), {
    message: "Contract failed to define requirement",
});

const isBreach = duckfaults(makeDuck(isFunction), {
    message: "Contract failed to define an action for requirement breach"
});

const isGet = duckfaults(makeDuck(isFunction), {
    message: "Contract failed to provide an action for getting the current role"
});

export const isContract = makeDuck({
    shall: isShall,
    get: isGet,
    breach: isBreach,
});