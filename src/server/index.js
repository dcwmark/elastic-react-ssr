// src/server/index.js 

import express from "express";
import cors from "cors";

import { renderToString } from "react-dom/server";
import React from "react";

import { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } from "./constants";
import elasticsearch from "elasticsearch";

import App from "../shared/App";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static('public'));

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


app.get("*", (req, res, next) => {
    const markup = renderToString(
      <App />
    )
  
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
            <title>SSR with RR</title>
        </head>
  
        <body>
            <div id="app">${markup}</div>
            <script src="/bundle.js" defer></script>
        </body>
      </html>
    `)
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
