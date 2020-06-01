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
    .then( response => {
        // console.log('fileTult:: ' + JSON.stringify(response)
        // res.send(bulkIndex(res, index, type, response));
        bulkIndex(res, index, type, response)
        .then( resolve => res.status(200).send(resolve) )
        .catch( reject => res.status(400).send(reject) );
    })
    .catch( reject =>  res.status(400).send(reject) );
});

export default router;
