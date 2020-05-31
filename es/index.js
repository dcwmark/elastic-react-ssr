// es/index.js

"use strict";

import { bulkIndex as esBulkIndex } from './bulkIndex';
import { searchIndex as esSearchIndex } from './searchIndex';

export const bulkIndex = (res, index, type, data) => {
    return esBulkIndex(res, index, type, data);
};

export const searchIndex = (req, res) => {
    esSearchIndex(req.query)
    .then( results => {
        res.json(results);
    })
    .catch( error => {
        res.json(error);
    });
};
