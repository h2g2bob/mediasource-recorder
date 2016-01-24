var self = require('sdk/self');

var chunk_receiver = function (worker) {
	worker.port.on("msr-chunk", function(elementContent) {
		console.log("msr-chunk " + elementContent);
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
