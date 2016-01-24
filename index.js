var self = require('sdk/self');

var pageMod = require("sdk/page-mod");
pageMod.PageMod({
  include: /.*(example\.(com|org)|youtube\.com).*/,
  contentScriptFile: self.data.url("injected.js")
});
