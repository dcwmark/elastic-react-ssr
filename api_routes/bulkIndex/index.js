// api_routes/bulkIndex/index.js

"use strict";

import express from "express";

import { fileToJSON } from '../../fileParsers';
import { bulkIndex } from '../../es';

const router = express.Router();

// full path: http://localhost:5000/api/bulkindex/tutorial/cities/cities
router.get('/:index/:type/:file', (req, res) => {
    const { type, index, file } = req.params;
    console.log(JSON.stringify(req.params));
    console.log(`index:: ${index}`);
    console.log(`type:: ${type}`);
    console.log(`file:: ${file}`);
    
    const fileName = `${file}.json`;

    fileToJSON(fileName)
    .then( fileData => {
        bulkIndex(index, type, fileData)
        .then( response => res.send(response) )
        .catch( reject =>  res.send(reject) );
    })
    .catch( error => res.send(error) );
});

export default router;
