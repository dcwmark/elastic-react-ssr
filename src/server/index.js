// src/server/index.js 

"use strict";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import React from "react";
import { renderToString } from "react-dom/server";

import { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } from "../../constants";
import elasticsearch from "elasticsearch";

import apiRoutes from "../../api_routes/";
import App from "../shared/App";

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
    /**
     * May not need these when 'using' cors()
     app.use( (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, GET, POST, DELETE, OPTIONS'
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
     });
     * 
    **/
                
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    /* api routes registrar */
    // apiRoutes(app);
    app.use('/api', apiRoutes);
    /* -------------------- */

    // app.get("*", (req, res, next) => {
    //     const markup = renderToString(<App />);

    //     res.send(`
    //         <!DOCTYPE html>
    //         <html>
    //             <head>
    //             <title>Elastic React SSR</title>
    //         </head>
        
    //         <body>
    //             <div id="app">${markup}</div>
    //             <script src="/bundle.js" defer></script>
    //         </body>
    //         </html>
    //     `)
    // });

    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
})();
