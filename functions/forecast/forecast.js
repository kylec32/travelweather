const fetch = require('node-fetch'); 

const KEY = process.env.DARK_SKY_KEY;

exports.handler = function(event, context, callback) {
    let url = `https://api.darksky.net/forecast/${KEY}/${event.queryStringParameters.latitude},${event.queryStringParameters.longitude}`;

    (async () => {
        let response = await fetch(url);
        let jsonResponse = await response.json();
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(jsonResponse)
        });
    })();

    
}