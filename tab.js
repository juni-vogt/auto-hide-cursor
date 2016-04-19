chrome.storage.sync.get("defaultOptions", function(defaults) {
	chrome.storage.sync.get(defaults.defaultOptions, function(options) {
		chrome.storage.sync.get("cursorHidden", function(initialCursor) {
			init(options, initialCursor.cursorHidden)
		});
	});
});

var init = function(options, initialCursor) {

	var locCursorHidden = initialCursor, // cache
		delay = parseInt(options.delay) * 1000,
		timer = null,

		toggleCursor = function() {
			chrome.storage.sync.set({ 'cursorHidden': !locCursorHidden });
		},

		updateCursor = function(add) {
			document.documentElement.classList[add ? "add" : "remove"](
				// not using toggle because a cached page could still have the class
				'__auto-hide-cursor--cursor-hidden'
			);
		}


	chrome.storage.onChanged.addListener(function(changes, namespace) {
		if ("cursorHidden" in changes) {
			// even changes the class in not-focused tabs

			locCursorHidden = changes.cursorHidden.newValue;
			// console.log("cursor is now", locCursorHidden ? "hidden" : "visible");

			updateCursor(locCursorHidden);
		}
	});

	updateCursor(locCursorHidden)

	document.onmousemove = function() {
		if (locCursorHidden) {
			toggleCursor();
		}

		debounce(function() {
			toggleCursor();
		}, delay)();
	};


	// remysharp.com/2010/07/21/throttling-function-calls
	function debounce(fn, delay) {
		return function() {
			var context = this,
				args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		};
	}
};
