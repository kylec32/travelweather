const fetch = require('node-fetch'); 

const KEY = process.env.HERE_KEY;

exports.handler = function(event, context, callback) {
    let url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${event.queryStringParameters.latitude}%2C${event.queryStringParameters.longitude}%2C1500&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=${KEY}`

    (async () => {
        let response = await fetch(url);
        let jsonResponse = await response.json();
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(jsonResponse)
        });
    })();  
}