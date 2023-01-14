
const got = require('got');
const chalk = require('chalk');

/**

 * 
 *
 * @param {String} url The URL with the get request
 * @return {Object} The body of the response as JS element
 */
async function makeGetRequest(url)
{
    try {
       const response = await got(url);

       const body_response = JSON.parse(response.body);

        return body_response;

    } catch (err)
    {
        console.error(chalk.red.bgWhite('HTTP Request through got ' +
        'has failed.\n'+
        'URL: ' + url + "\nError Message:\n"), err);
        process.exit(-1);
    }
} 


module.exports = {
    makeRequest: makeGetRequest
}