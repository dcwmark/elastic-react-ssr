// api_routes/index.js

"use strict";

import express from "express";

import bulkIndex from "./bulkIndex";
import searchIndex from "./searchIndex";

const router = express.Router();

router.use('/bulkIndex', bulkIndex);
router.use('/search', searchIndex);

export default router;
