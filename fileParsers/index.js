// fileParsers/index.js

"use strict";

import fs from "fs";

export const fileToJSON = (fileName) => {
    return new Promise( (resolve, reject) => {
        try {
            const fileRaw = fs.readFileSync(fileName);
            resolve(JSON.parse(fileRaw));
        } catch(err) {
            reject(err);
        }
    });
};
