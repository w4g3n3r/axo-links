// The background page is asking us to find an address on the page.
if (window == top) {
    chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {

        document.addEventListener("DOMNodeInserted", function (e) {
            if (e.target.nodeType == 1 && /\bmessage\b/.test(e.target.className)) {
                var parent = e.target;
                var elements = parent.querySelectorAll('span.message_content');
                for (var i = 0, j = elements.length; i < j; i++) {
                    var element = elements[i];
                    var html = element.innerHTML;

                    var newHtml = axolinks.linkify(html, req.axosoftUrl);

                    if (html != newHtml) element.innerHTML = newHtml;
                }
            }
        });
    });
}
