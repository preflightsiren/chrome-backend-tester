// Saves options to chrome.storage
function save_options() {
  var hostName = document.getElementById('hostName').value;
  var hostHeader = document.getElementById('hostHeader').checked;
  chrome.storage.sync.set({
    hostName: hostName,
    hostHeader: hostHeader
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    hostName: '',
    hostHeader: ''
  }, function(items) {
    document.getElementById('hostName').value = items.hostName;
    document.getElementById('hostHeader').checked = items.hostHeader;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);