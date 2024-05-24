"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        // console.log(key);
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            // console.log(key);
            finalObj[key] = obj[key];
        }
    }
    // console.log(finalObj);
    return finalObj;
};
exports.pick = pick;
