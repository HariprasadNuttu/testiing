/*
 * Helpers for various tasks
 *
 */

// Dependencies
var config = require('./config');
var querystring = require('querystring');

// Container for all the helpers
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{

    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};



// Export the module
module.exports = helpers;
