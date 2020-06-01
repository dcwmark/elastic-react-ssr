// es/bulkIndex.js

"use strict";

import { ELASTIC_SEARCH_HOST, ELASTIC_SEARCH_PORT } from "../constants";
import elasticsearch from "elasticsearch";

const esClient = new elasticsearch.Client({
    host: `${ELASTIC_SEARCH_HOST}${ELASTIC_SEARCH_PORT}`,
    log: 'error'
});

export const bulkIndex = async (res, index, type, data) => {
    // console.log(`********** bulkIndex::${JSON.stringify(data)}`);
    await ( async () => {
        await cleanUp(index)
        .then( resolve => {
            console.log(`cleanUp resolve::${JSON.stringify(resolve)}`);
        })
        .catch( reject => {
            console.log(`cleanUp reject::${JSON.stringify(reject)}`);
            return res.json(reject);
        });
    })();
    
    console.log(`Setup insert index::${index} type::${type}`);
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

    console.log(`About to bulk insert index::${index} type::${type}`);
    var start = Date.now();
    esClient.bulk({ body: bulkBody })
    .then( response => {
        // console.log(`bulkIndex response::${JSON.stringify(response)}`);
        let errorCount = 0;
        response.items.map( item => {
            if (item.index && item.index.error) {
                console.log(++errorCount, item.index.error);
            }
        });
        var done = Date.now();
        console.log(`Completed in ${done - start} ms`);
        res.status(200).json(
            `Successfully indexed ${data.length - errorCount}
             out of ${data.length} items`
        );
    })
    .catch( reject => {
        return res.status(400).json(reject);
    });
};

const cleanUp = (index) => {
    console.log(`About to delete index::${index}`);
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
    })
};
