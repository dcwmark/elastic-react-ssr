// es/bulkIndex.js

"use strict";

import { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } from "../constants";
import elasticsearch from "elasticsearch";

const esClient = new elasticsearch.Client({
    host: `${ELASTIC_SEARCH_HOST}${ELASTIC_SEARCH_PORT}`,
    log: 'error'
});

export const bulkIndex = (index, type, data) => {
    cleanUp(index)
    .then( resolve => {
        console.log(`***** cleanup returned *****`);
        return resolve;
    })
    .then( () => {
        return new Promise( (resolve, reject ) => {
            console.log(`***** about to data map *****`);
            try {
                let bulkBody = [];
                
                data.map( item => {
                    bulkBody.push({
                        index: {
                            _index: index,
                            _type: type,
                            _id: item.id
                        }
                    });
                    
                    bulkBody.push(item);
                });
                resolve(bulkBody);
            } catch(error) {
                reject(error);
            }
        });
    })
    .then( bulkBody => {
        return new Promise( (resolve, reject) => {
            console.log(`***** about to esClient bulk *****`);
            try {
                const start = Date.now();
                const results = esClient.bulk({ body: bulkBody });
                const done = Date.now();
                console.log(`***** Completed in ${done - start} ms *****`);
                resolve(results);
            } catch(error) {
                reject(error);
            }
        });
    })
    .then( results => {
        return new Promise( (resolve, reject) => {
            console.log(`***** about to count results *****`);
            try {
                let errorCount = 0;
                results.items.map( item => {
                    if (item.index && item.index.error) {
                        console.log(++errorCount, item.index.error);
                    }
                });
                console.log(`***** Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
                resolve({
                    success: `Successfully indexed ${data.length - errorCount} out of ${data.length} items`
                });
            } catch(error) {
                reject(error);
            };
        });
    })
    .catch( error => {
        Promise.reject(error);
    });
};

const cleanUp = (index) => {
    // console.log(`About to delete index::${index}`);
    return new Promise( (resolve, reject) => {
        esClient.indices.delete({
            index: index
        })
        .then( response => {
            resolve(
                `elasticsearch ${index} deleted: ${JSON.stringify(response)}`
            );
        })
        .catch( error => {
            if (error.status === 404) {
                resolve(`${index} does not exist; nothing to delete.`);
            } else {
                reject(error);
            }
        });
    });
};
