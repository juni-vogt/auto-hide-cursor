chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({
		defaultOptions: {
			'delay': '2.5'
		},
		cursorHidden: false
	});
});

chrome.commands.onCommand.addListener(function(command) {
	if (command === "hide-cursor")
		chrome.storage.sync.set({ 'cursorHidden': true });
});
