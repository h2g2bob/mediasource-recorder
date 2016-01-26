const self = require('sdk/self');

const {Cu} = require("chrome");
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});

var chunk_receiver = function (worker) {

	worker.port.on("msr-chunk", function(message) {
		// this should be an [object ArrayBuffer]
		// but is actually an [object Object]
		// Also, if we sent a Uint8Array, we get a {0:255, 1:255, 2:255, ...} object
		let chr_list = message;

		let arraybuffer = Uint8Array.from(chr_list)

		console.log("msr-chunk " + arraybuffer.toSource().substring(0, 100));

		// https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/OSFile.jsm/OS.File_for_the_main_thread
		let uuid = require('sdk/util/uuid').uuid();
		let promise = OS.File.writeAtomic(
			"/tmp/msr-data-" + uuid,
			arraybuffer,
			{noOverwrite: true});
	});
}

var pageMod = require("sdk/page-mod");
pageMod.PageMod({
	// include: /.*(example\.(com|org)|youtube\.com).*/,
	include: "*",
	contentScriptFile: self.data.url("injected.js"),
	contentScriptWhen: "start",
	onAttach: chunk_receiver,
	attachTo: ["existing", "top", "frame"]
});
