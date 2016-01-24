// unsafeWindow: https://blog.mozilla.org/addons/2014/04/10/changes-to-unsafewindow-for-the-add-on-sdk/

unsafeWindow.injected = false;

// execute immediately, but in a closure so we can have local variables.
if (unsafeWindow.MediaSource !== undefined) {


	// make addSourceBuffer() return a wrapper object
	var original_function = unsafeWindow.MediaSource.prototype.addSourceBuffer;
	function replacement_function() {
		alert("sourcebuffer");
/*
		var sourcebuffer = original_function.apply(this, arguments);

		// wrap the appendBuffer function
		var original_appendbuffer = sourcebuffer.appendBuffer;
		sourcebuffer.appendBuffer = function () {
			alert("appendBuffer " + this + ", " + arguments);
			original_appendbuffer.apply(this, arguments);
		}

		alert("sourcebuffer " + sourcebuffer);
		return sourcebuffer;
*/
	};

	exportFunction(replacement_function, unsafeWindow, {defineAs: "replacement_function"});
	unsafeWindow.MediaSource.prototype.addSourceBuffer = unsafeWindow.replacement_function;

	unsafeWindow.injected = true;
	alert("injected " + unsafeWindow.MediaSource.prototype);


}
