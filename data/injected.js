
function privileged_appendbuffer(arraybuffer) {
	try {
		// we might get a Uint8Array, which isn't serialized well when sent over self.port.emit
		// so we want a real ArrayBuffer instead
		if (arraybuffer.buffer !== undefined) {
			arraybuffer = arraybuffer.buffer;
		}

		// the original is in the page context scope, so we create a copy
		var copy = cloneInto(arraybuffer, window);

		console.log("appendBuffer " + copy.toString())

		// XXX we can't send an ArrayBuffer over this interface?!
		self.port.emit("msr-chunk", copy);
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
