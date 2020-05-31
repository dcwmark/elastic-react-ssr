// api_routes/searchIndex/index.js

"use strict";

import express from "express";

import { searchIndex } from '../../es';

const router = express.Router();

//full path: http://localhost:5000/api/search
router.get('/', (req, res) => {
    return searchIndex(req, res);
});

export default router;
