chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
	
	var focusEl = window.top.document.activeElement;
	var text	= request.glyph;
	if (focusEl.tagName.toLowerCase() == 'input' || focusEl.tagName.toLowerCase() == 'textarea')
	{
		var startPos	= focusEl.selectionStart;
		var endPos		= focusEl.selectionEnd;

		// insert text
		focusEl.value = focusEl.value.substring(0, startPos)
							+ text
							+ focusEl.value.substring(endPos, focusEl.value.length);

		// update current position
		focusEl.setSelectionRange(startPos + text.length, startPos + text.length);
		
	}
	else
	{
		sendResponse({action: "copy",glyph:text});	
	}
});