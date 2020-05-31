// api_Routes/index.js

"use strict";

import express from "express";

import bulkIndex from "./bulkIndex";
import searchIndex from "./searchIndex";

const router = express.Router();

router.use('/bulkIndex', bulkIndex);
router.use('/search', searchIndex);

/*
const apiRoutes = (app) => {
    app.use('/api', bulkIndex);

    app.use('/search', searchIndex);

    return router;
};
*/

export default router;
