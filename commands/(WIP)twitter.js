// var apiKey = "7ms2se93Dk7r7YVUO9ioz2RW5";
// var apiSecret = "pWwT7MRK7avfkmaHOCBYH2OF9nCxUkVTnp3liPlDyEuJvRN9fI";
// var beer = "AAAAAAAAAAAAAAAAAAAAAPDgHQEAAAAAmiz%2BmaMf4%2FSJqIsHThu%2FFL6q0YE%3Dx4J2VdelPGRrbkP2JYmsjfSiuiAV0z2MZRxb578fAQZ4c6Xp6t";

// const needle = require('needle');

// const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
// const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

// const rules = [
//     {'value': 'from:AV_Telluric -is:retweet', 'tag': 'Simon'},
//     //{'value': 'COVID -is:retweet is:verified', 'tag': 'Covid'},
// ];

// async function getAllRules() {
//     const response = await needle('get', rulesURL, {headers: {
//         'authorization': `Bearer ${beer}`
//     }})

//     return(response.body);
// }
// async function deleteAllRules(rules) {

//     if (!Array.isArray(rules.data)) {
//         return null;
//       }

//     const ids = rules.data.map(rule => rule.id);

//     const data = {
//         "delete": {
//             "ids": ids
//         }
//     }

//     const response = await needle('post', rulesURL, data, {headers: {
//         "content-type": "application/json",
//         "authorization": `Bearer ${beer}`
//     }}) 

//     if (response.statusCode !== 200) {
//         throw new Error(response.body);
//         return null;
//     }
    
//     return (response.body);

// }

// async function setRules() {

//     const data = {
//         "add": rules
//       }

//     const response = await needle('post', rulesURL, data, {headers: {
//         "content-type": "application/json",
//         "authorization": `Bearer ${beer}`
//     }}) 

//     if (response.statusCode !== 201) {
//         throw new Error(response.body);
//         return null;
//     }
    
//     return (response.body);

// }

// function streamConnect() {
//     //Listen to the stream
//     const options = {
//         timeout: 20000
//       }
    
//     const stream = needle.get(streamURL, {
//         headers: { 
//             Authorization: `Bearer ${beer}`
//         }
//     }, options);

//     stream.on('data', data => {
//     try {
//         const json = JSON.parse(data);
//         console.log(json);
//     } catch (e) {
//         // Keep alive signal received. Do nothing.
//     }
//     }).on('error', error => {
//         if (error.code === 'ETIMEDOUT') {
//             stream.emit('timeout');
//         }
//     });

//     return stream;
    
// }


// (async () => {
//     let currentRules;
  
//     try {
//       // Gets the complete list of rules currently applied to the stream
//       currentRules = await getAllRules();
      
//       // Delete all rules. Comment the line below if you want to keep your existing rules.
//       await deleteAllRules(currentRules);
  
//       // Add rules to the stream. Comment the line below if you don't want to add new rules.
//       await setRules();
      
//     } catch (e) {
//       console.error(e);
//       process.exit(-1);
//     }
  
//     // Listen to the stream.
//     // This reconnection logic will attempt to reconnect when a disconnection is detected.
//     // To avoid rate limites, this logic implements exponential backoff, so the wait time
//     // will increase if the client cannot reconnect to the stream.
  
//     const filteredStream = streamConnect()
//     let timeout = 0;
//     filteredStream.on('timeout', () => {
//       // Reconnect on error
//       console.warn('A connection error occurred. Reconnecting…');
//       setTimeout(() => {
//         timeout++;
//         streamConnect(beer);
//       }, 2 ** timeout);
//       streamConnect(beer);
//     })

//   })();