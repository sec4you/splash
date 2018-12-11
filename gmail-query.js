console.log("Initializing");

var API_KEY = "";
var CLIENT_ID = "";
var USER_ID = "[email]";
var FILTER = "from:@domain.com"; // GMail filter

/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */
function listMessages(userId, query, callback) {
  var getPageOfMessages = function(request, result) {
    request.execute(function(resp) {
      result = result.concat(resp.messages);
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.client.gmail.users.messages.list({
          'userId': userId,
          'pageToken': nextPageToken,
          'q': query
        });
        getPageOfMessages(request, result);
      } else {
        callback(result);
      }
    });
  };
  var initialRequest = gapi.client.gmail.users.messages.list({
    'userId': userId,
    'q': query
  });
  getPageOfMessages(initialRequest, []);
}

function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': API_KEY,
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': CLIENT_ID,
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    });
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    if (reason.result !== 'undefined') {
      if (reason.result.error !== 'undefined') {
        console.log('Error: ' + reason.result.error.message);
      } else {
        console.log('Error: ' + JSON.stringify(reason.result.error));
      }
    } else {
      console.log('Error: ' + JSON.stringify(reason.result));
    }
  });
};

console.log("Running");
// 1. Load the JavaScript client library.
gapi.load('client', start);

listMessages(USER_ID, FILTER, function(data) {
  console.log(JSON.stringify(data));
});