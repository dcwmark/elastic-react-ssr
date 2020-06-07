// es/index.js

"use strict";

import { bulkIndex as esBulkIndex } from './bulkIndex';
import { searchIndex as esSearchIndex } from './searchIndex';

export const bulkIndex = (index, type, data) => {
    return esBulkIndex(index, type, data);
};

export const searchIndex = (index, type, query) => {
    return esSearchIndex(index, type, query);
};
