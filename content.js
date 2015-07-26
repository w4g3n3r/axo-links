// The background page is asking us to find an address on the page.
if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(findTags(req.axosoftUrl));
  });
}

// Search text nodes for an axosoft item tag.
var findTags = function(url) {

    var elements = document.querySelectorAll('div.commit-desc');
    var re = /axo([itdf])\s?:\s?(\d+)/ig;

    console.log("Searching for tags...");
    for (var i = 0, j = elements.length; i < j; i++) {
	var element = elements[i];
	var html = element.innerHTML;
	var hasMatches = false;
	
	html = html.replace(re, function(match, p1, p2, offset, string) {
	    console.log(" - " + match);
	    //https://avalamarketing.ontimenow.com/viewitem.aspx?id=3678&type=defects&force_use_number=true
	    //https://avalamarketing.ontimenow.com/viewitem.aspx?id=9309&type=features&force_use_number=true
	    //https://avalamarketing.ontimenow.com/viewitem.aspx?id=SRX01000&type=incidents&force_use_number=true
	    //https://avalamarketing.ontimenow.com/viewitem.aspx?id=3&type=tasks&force_use_number=true
	    hasMatches = true;
	    //return "AXO" + p1.toUpperCase() + " : " + p2;

	    switch (p1.toLowerCase()) {
	    case "f": type = "features"; break;
	    case "t": type = "tasks"; break;
	    case "i": type = "incidents"; break;
	    default: type = "defects";
	    }

	    var link = '<a href="' + url  + '/viewitem.aspx?id='
		+ p2 + '&type='
		+ type + '&force_use_number=true">'
		+ match + '</a>';

	    console.log(link);
	    return link;
	});

	if (hasMatches) element.innerHTML = html;
    }
}
