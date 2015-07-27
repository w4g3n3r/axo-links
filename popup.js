document.addEventListener('DOMContentLoaded', function(){
    var saveButton = document.getElementById('saveButton');
    var axosoftUrl = document.getElementById('axosoftUrl');

    if (axosoftUrl) {
	chrome.storage.sync.get('axosoftUrl', function(items) {
	    axosoftUrl.value = items['axosoftUrl'];
	});
    }
    
    if (saveButton) {
	saveButton.addEventListener('click', function() {
	    var axosoftUrl = document.getElementById('axosoftUrl');
	    if (axosoftUrl) {
		chrome.storage.sync.set({'axosoftUrl': axosoftUrl.value});
	    }
	    window.close();
	});
    }
});
