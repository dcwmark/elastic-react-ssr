// fileParsers/index.js

"use strict";

import fs from "fs";

export const fileToJSON = async (fileName) => {
    const fileRaw = await fs.readFileSync(fileName);
    return JSON.parse(fileRaw);
};
