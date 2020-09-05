// src/server/index.js 

"use strict";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } from "../../constants";
import elasticsearch from "elasticsearch";

import apiRoutes from "../../api_routes/";
import ssrRoutes from "../../ssr_routes/";

//=-
// Elasticsearch Setup 
//=-
( () => {
    // instantial an Elasticsearch client
    const esClient = new elasticsearch.Client({
        hosts: [
            `${ELASTIC_SEARCH_HOST}${ELASTIC_SEARCH_PORT}`
        ]
    });
    
    //ping esClient
    esClient.ping({ requestTimeout: 30000 }, (error) => {
        if ( error ) {
            console.error(`elasticsearch cluster is down! ${error}`);
        } else {
            console.log('elasticsearch is ok');
        }
    });
    //elasticsearch is ok
})();

//=-
// Express Setup 
//=-
( () => {
    const PORT = process.env.PORT || 5000;
    const app = express();

    app.use(express.static('public'));
    
    // enable CORS
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    /* api routes registrar */
    // apiRoutes(app);
    app.use('/api', apiRoutes);
    /* -------------------- */
    app.use('*', ssrRoutes);

    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
})();
