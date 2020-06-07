// api_routes/searchIndex/index.js

"use strict";

import express from "express";

import { searchIndex } from '../../es';

const router = express.Router();

//full path: http://localhost:5000/api/search/tutorial/cities
router.get('/:index/:type', (req, res) => {
    const { type, index } = req.params;
    const query = req.query.q;
    console.log(`index:: ${index}`);
    console.log(`type:: ${type}`);
    console.log(`query:: ${query}`);
    searchIndex(index, type, query)
    .then( response => res.send(response) )
    .catch( reject => res.send(reject) );
});

export default router;
