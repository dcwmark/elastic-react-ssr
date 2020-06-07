// es/searchIndex.js

"use strict";

import { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } from "../constants";
import elasticsearch from "elasticsearch";

const esClient = new elasticsearch.Client({
    host: `${ELASTIC_SEARCH_HOST}${ELASTIC_SEARCH_PORT}`,
    log: 'error'
});

export const searchIndex = (index, type, query) => {
    const body = {
        size: 200,
        from: 0,
        query: {
            match: {
                name: query,
            },
        },
    };
    
    return new Promise( (resolve, reject) => {
        esClient.search({ index, body, type })
        .then( results => resolve(results.hits.hits) )
        .catch( error => reject(error) );
    });
};
