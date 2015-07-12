// A generic onclick callback function.
function genericOnClick(info, tab) {
  text = info.selectionText;
  while (text.length != 0 && text[text.length - 1].match('[^A-Za-z]')) {
	text = text.substring(0, text.length - 1);
  }
  while (text.length != 0 && text[0].match('[^A-Za-z]')) {
	text = text.substring(1);
  };
  if (text.length == 0)
	return;
  chrome.windows.create({ url: 'http://dict.cn/mini.php?q=' + text, width: 500, height: 500 });
}

chrome.contextMenus.create({"title": "Lookup '%s' in Dict.cn", "contexts": ["selection"], "onclick": genericOnClick});
