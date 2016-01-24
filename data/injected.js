if (unsafeWindow.SourceBuffer !== undefined) {
	// make addSourceBuffer() return a wrapper object
	var original_append_buffer = unsafeWindow.SourceBuffer.prototype.appendBuffer;
	exportFunction(original_append_buffer, unsafeWindow, {defineAs: "original_append_buffer"});

	function replacement_append_buffer(arraybuffer) {
		console.log("appendBuffer " + arraybuffer.toString())
		// self.port.emit("msr-chunk", arraybuffer);

		// this function returns void
		unsafeWindow.original_append_buffer.apply(this, arguments);

		return undefined;
	};

	exportFunction(replacement_append_buffer, unsafeWindow, {defineAs: "replacement_append_buffer"});
	unsafeWindow.SourceBuffer.prototype.appendBuffer = unsafeWindow.replacement_append_buffer;
}
