
function doIt() {
  var url_string = window.location;
  var url = new URL(url_string);
  var q = url.searchParams.get("q");
  var body = document.getElementById("body");
  if (!q) {
    body.innerText = 'No word for query.';
    return;
  }

  var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en-US&tl=zh-CN&hl=en-US&dt=t&dt=bd&dj=1&source=icon&q=' + q;

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    var content = '';
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        var txt = xmlhttp.responseText;
        txt = JSON.parse(txt);
        var word;
        var simpleTranslation;
        if (txt['sentences'] && txt['sentences'].length > 0) {
          txt['sentences'].forEach(function (data) {
            word = data['orig'];
            simpleTranslation = data['trans'];
            content += '<p>' + word + '</p>\n';
            content += '<p>' + simpleTranslation + '</p>\n';
          });
        } else {
          word = '';
          simpleTranslation = '';
          content += '<p>' + word + '</p>\n';
          content += '<p>' + simpleTranslation + '</p>\n';
        }

        var pos;
        var fullTranslation = '';
        if (txt['dict'] && txt['dict'].length > 0) {
          txt['dict'].forEach(function (data) {
            var pos = data['pos'];
            var fullTranslation = data['terms'].join(', ');
            content += '<p>' + pos + ':\t' + fullTranslation + '</p>\n';
          });
        } else {
          fullTranslation = '';
          content += '<p>' + fullTranslation + '</p>\n';
        }
      } else if (xmlhttp.status == 400) {
        content = 'There was an error 400.';
      } else {
        content = 'something else other than 200 was returned.';
      }
    } else {
      content = 'Loading... ' + xmlhttp.readyState;
    }
    body.innerHTML = content;
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();


}

document.addEventListener("DOMContentLoaded", doIt);