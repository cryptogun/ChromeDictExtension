// A generic onclick callback function.
function genericOnClick(info, tab) {
  text = info.selectionText;
  while (text.length != 0 && text[text.length - 1].match('[^A-Za-z]')) {
    text = text.substring(0, text.length - 1);
  }
  while (text.length != 0 && text[0].match('[^A-Za-z]')) {
    text = text.substring(1);
  };
  if (text.length == 0) {
    return;
  }

  // var url = 'http://apii.dict.cn/mini.php?q=' + text;
  var url = chrome.extension.getURL('google.html?q=' + text);
  chrome.windows.create({ url: url, width: 300, height: 300, top:0, left: 0, focused: true }, function(win) {
    var windowId = win.id;
    autoCloseCallback = function(nowFocusWindowId) {
      if (nowFocusWindowId !== windowId && nowFocusWindowId !== -1) {
        chrome.windows.onFocusChanged.removeListener(autoCloseCallback);
        chrome.windows.getAll({}, function(wins) {
          wins.forEach(function (win) {
            if (win.id === windowId) {
              chrome.windows.remove(windowId);
            }
          })
        });
      }
    };
    chrome.windows.onFocusChanged.addListener(autoCloseCallback);
  });
}

chrome.contextMenus.create({"title": "???????????? %s", "contexts": ["selection"], "onclick": genericOnClick});
