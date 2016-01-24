var self = require('sdk/self');

var pageMod = require("sdk/page-mod");
pageMod.PageMod({
	// include: /.*(example\.(com|org)|youtube\.com).*/,
	include: "*",
	contentScriptFile: self.data.url("injected.js"),
	contentScriptWhen: "start",
	// onAttach: a function which adds a listener for postMessage
	attachTo: ["existing", "top", "frame"]
});
