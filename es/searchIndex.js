// es/searchIndex.js

"use strict";

import { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } from "../constants";
import elasticsearch from "elasticsearch";

const esClient = new elasticsearch.Client({
    host: `${ELASTIC_SEARCH_HOST}${ELASTIC_SEARCH_PORT}`,
    log: 'error'
});

export const searchIndex = (query) => {
    let body = {
        size: 200,
        from: 0,
        query: {
            match: {
                name: query['q'],
            },
        },
    };
    
    return new Promise( (resolve, reject) => {
        esClient.search({
            index: 'tutorial',
            body: body,
            type: 'cities',
        })
        .then( results => {
            resolve(results.hits.hits);
        })
        .catch( error => {
            reject(error);
        });
    });
};
