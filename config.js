const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "2JlwmATD#zLegNqDof9o5a9R08pD-_eaz35j3zTtGQaV_BNEuhOY",
MONGODB: process.env.MONGODB || "mongodb://mongo:MgRxoQTXWnKFtprOrocHAeucSEKWBtoE@junction.proxy.rlwy.net:45585",
};
