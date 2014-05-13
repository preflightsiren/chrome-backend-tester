var hostName = '';
var hostHeader = '';

var syncConfig = function() {
  chrome.storage.sync.get({
      hostName: '',
      hostHeader: ''
    }, function(items) {
      console.log("loaded config")
      hostName = items.hostName;
      console.log("Filtering requests for %s", hostName)
      hostHeader = items.hostHeader;
      console.log("setting Host to", hostHeader)
    });
}

chrome.storage.onChanged.addListener( syncConfig );
// retrieve any settings from the chrome storage api on startup.
syncConfig();

chrome.webRequest.onBeforeSendHeaders.addListener(
  function filterRequest(details) {
    // if no hostName is given
    // or the url does not contain the hostname
    // stop processing
    var url = "://".concat(hostName)
    if ((hostName.length == 0) || (details.url.indexOf(url) <= -1)) {
      return;
    }
    console.log("Redirecting %s to %s", details.url, hostHeader)
    details.requestHeaders.push({ "name":"Host", "value":hostHeader})

    return {requestHeaders: details.requestHeaders};
  }
  ,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]);