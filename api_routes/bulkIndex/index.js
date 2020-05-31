// api_routes/bulkIndex/index.js

"use strict";

import express from "express";

import { fileToJSON } from '../../fileParsers';
import { bulkIndex } from '../../es';

const router = express.Router();

// full path: http://localhost:5000/api/bulkindex/cities/tutorial/cities
router.get('/:file/:index/:type', (req, res, next) => {
    const { file, index, type } = req.params;
    console.log(JSON.stringify(req.params));
    console.log(`file:: ${file}`);
    console.log(`index:: ${index}`);
    console.log(`type:: ${type}`);
    
    const fileName = `${file}.json`;
    
    fileToJSON(fileName)
    .then( result => {
        console.log('fileToJSON result:: ' + JSON.stringify(result));
        res.json(bulkIndex(res, index, type, result));
    })
    .catch( reject => {
        res.json(reject);
    });
});

export default router;
