var hostName = '';
var hostHeader = '';

chrome.storage.onChanged.addListener( function syncConfig() {
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
})

chrome.webRequest.onBeforeSendHeaders.addListener(
  function filterRequest(details) {
    console.log("hostName is %s, length of %d", hostName, hostName.length)
    // if no hostName is given
    // or the url does not contain the hostname
    // stop processing
    if ((hostName.length == 0) || (details.url.indexOf(hostName) <= -1)) {
      return;
    }
    console.log("Redirecting %s to %s", details.url, hostHeader)
    details.requestHeaders.push({ "name":"Host", "value":hostHeader})

    return {requestHeaders: details.requestHeaders};
  }
  ,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]);