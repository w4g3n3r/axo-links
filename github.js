// The background page is asking us to find an address on the page.
if (window == top) {
  chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
      if (req.axosoftUrl) findTags(req.axosoftUrl);
  });
}

// Search text nodes for an axosoft item tag.
var findTags = function(axosoftUrl) {

    var elements = document.querySelectorAll('div.commit-desc');

    for (var i = 0, j = elements.length; i < j; i++) {
        var element = elements[i];
        var html = element.innerHTML;

        var newHtml = axolinks.linkify(html, axosoftUrl);

        if (html != newHtml) element.innerHTML = newHtml;
    }
}