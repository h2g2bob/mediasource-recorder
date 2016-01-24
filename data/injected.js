
(function () {
	// execute immediately, but in a closure so we can have local variables.
	if (window.MediaSource !== undefined) {

		// make addSourceBuffer() return a wrapper object
		var original_function = window.MediaSource.prototype.addSourceBuffer;
		window.MediaSource.prototype.addSourceBuffer = function () {
			alert("sourcebuffer");

			var sourcebuffer = original_function.apply(this, arguments);

			// wrap the appendBuffer function
			var original_appendbuffer = sourcebuffer.appendBuffer;
			sourcebuffer.appendBuffer = function () {
				alert("appendBuffer " + this + ", " + arguments);
				original_appendbuffer.apply(this, arguments);
			}

			alert("sourcebuffer " + sourcebuffer);
			return sourcebuffer;
		};

		alert("injected " + window.MediaSource.prototype);

	}
})();

