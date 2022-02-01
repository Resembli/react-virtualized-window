// See https://stackoverflow.com/a/31090240 for an explanation of the below code.
export const isBrowser = new Function("try {return this===window;}catch(e){ return false;}")()
