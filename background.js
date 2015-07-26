var axosoftUrl;

function updateTags(tabId) {
    if (axosoftUrl){
	chrome.tabs.sendRequest(tabId, {"axosoftUrl": axosoftUrl});
    }
}

function updateSelected(tabId) {
  selectedAddress = addresses[tabId];
  if (selectedAddress)
    chrome.pageAction.setTitle({tabId:tabId, title:selectedAddress});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateTags(tabId);
  }
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateTags(tabs[0].id);
});

chrome.storage.onChanged.addListener(function(changes, areaName){
    if (areaName == 'sync') {
	if (changes['axosoftUrl']){
	    axosoftUrl = changes['axosoftUrl'].newValue;
	}
    }
});

chrome.storage.sync.get('axosoftUrl', function(items) {
    if (items['axosoftUrl']) axosoftUrl = items['axosoftUrl'];
});
