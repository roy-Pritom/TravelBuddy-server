export const pick = <T extends Record<string,unknown>,K extends keyof T>(obj:T, keys:K[]):Partial<T> => {
    const finalObj:Partial<T>= {};
    for (const key of keys) {
        // console.log(key);
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            // console.log(key);
            finalObj[key] = obj[key]
        }
    }
    // console.log(finalObj);
    return finalObj;
}
