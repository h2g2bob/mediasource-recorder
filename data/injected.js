
function privileged_appendbuffer(arraybuffer) {
	try {
		// TODO I'm assuming that arraybuffer is a Uint8Array,
		// but technically it could be any ArrayBuffer!

		// the original is in the page context scope, so we create a copy
		var copy = cloneInto(arraybuffer, window);

		console.log("appendBuffer " + copy.toString())

		// we can't send ArrayBuffer (postMessage appears to support
		// it, but content-script Port() requires it can be serialized
		// to JSON.
		var list_elements = Array.from(copy.values());

		self.port.emit("msr-chunk", list_elements);
	} catch (e) {
		// if errors escape, the page won't have permissions to examine the contents of the error!
		// and you'll get "cannot access attribute 'code'", where code is an attrinute of an error object.
		console.error("msr-privileged_appendbuffer had error " + e);
	}
}
exportFunction(privileged_appendbuffer, unsafeWindow, {defineAs: "privileged_appendbuffer"});

var page_context_init_script = '' +
	'var original_append_buffer = window.SourceBuffer.prototype.appendBuffer;' +
	'var replacement_append_buffer = function () {' +
	'	privileged_appendbuffer(arguments[0]);' +
	'	original_append_buffer.apply(this, arguments);' +
	'	return undefined;' +
	'};' +
	'window.SourceBuffer.prototype.appendBuffer = replacement_append_buffer;'
unsafeWindow.eval(page_context_init_script);
