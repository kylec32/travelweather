const fetch = require('node-fetch'); 

const KEY = process.env.HERE_KEY;

exports.handler = async function(event, context, callback) {
    let url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${event.queryStringParameters.latitude}%2C${event.queryStringParameters.longitude}%2C3000&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=${KEY}`

    let response = await fetch(url);
    let jsonResponse = await response.json();
    let address = jsonResponse.Response.View[0].Result[0].Location.Address;
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({'city': address.City, 'state': address.State})
    });
}