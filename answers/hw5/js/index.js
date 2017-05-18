function renderChannel(length) {
  for (var c = 0; c < length; c++) {
    buildChannel(c);
  }
}

function buildChannel(data) {
  var flex_container = document.querySelector(".flex-container");
  var channel = document.createElement("div");
  var img = document.createElement("div");
  var channel_img = document.createElement("img");
  var defaultChannel_img = document.createElement("div");
  var user = document.createElement("div");
  var user_img = document.createElement("img");
  var defaultUser_img = document.createElement("div");
  var user_info = document.createElement("div");
  var user_title = document.createElement("div");
  var user_name = document.createElement("div");
  block(flex_container, channel, "channel");
  block(channel, img, "img");
  block(img, channel_img, "channel_img");
  block(img, defaultChannel_img, "defaultChannel_img");
  block(channel, user, "user");
  block(user, user_img, "user_img");
  block(user, defaultUser_img, "defaultUser_img");
  block(user, user_info, "user_info");
  block(user_info, user_title, "user_title", "頻道名稱");
  block(user_info, user_name, "user_name", "實況主名字");
}

function block(_parent, _children, _children_name, _children_text) {
  _children.className += _children_name;
  if (_children_text !== undefined) {
    _children.innerHTML = _children_text;
  }
  _parent.appendChild(_children);
}
function xhr(url, offset) {
  var httpRequest;
  //build XMLHttpRequest
  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
  } else {
    try {
      httpRequest = new ActiveXObject();
    } catch (e) {
      console("XMLHttpRequest not supported");
    }
  }
  //Request Start
  httpRequest.open("GET", url);
  httpRequest.onload = function() {
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
      // status success!
      // JSON
      var data = JSON.parse(httpRequest.response);
      //run
      dataIntoModel(data, offset);
    } else {
      // We reached our target server, but it returned an error
    }
  };
  httpRequest.onerror = function() {
    // There was a connection error of some sort
  };
  httpRequest.send();
}
function dataIntoModel(data, offset) {
  var channel_img = document.querySelectorAll(".channel_img");
  console.log();
  var channel_logo = document.querySelectorAll(".user_img");
  var channel_title = document.querySelectorAll(".user_title");
  var channel_name = document.querySelectorAll(".user_name");
  for (var c = 0; c < data.streams.length; c++) {
    channel_img[c + offset].addEventListener(
      "load",
      function() {
        this.style.opacity = 1;
      },
      true
    );
    channel_img[c + offset].src = data.streams[c].preview.medium;
    channel_logo[c + offset].addEventListener(
      "load",
      function() {
        this.style.opacity = 1;
      },
      true
    );
    channel_logo[c + offset].src = data.streams[c].channel.logo;
    channel_title[c + offset].innerHTML = data.streams[c].channel.status;
    channel_name[c + offset].innerHTML = data.streams[c].channel.display_name;
  }
}

window.addEventListener("scroll", function(event) {
  if (
    window.pageYOffset + window.innerHeight >
    document.body.scrollHeight - 200
  ) {
    renderChannel(limit);
    offset += limit;
    _url =
      "https://api.twitch.tv/kraken/streams/?client_id=" +
      client_ID +
      "&game=" +
      game +
      "&limit=" +
      limit +
      "&offset=" +
      offset;
    xhr(_url, offset);
  }
});

var game = "League%20of%20Legends";
var client_ID = "y7kmxph29brxczhdk9dn9ardapegmd";
var limit = 10;
var offset = 0;
var _url =
  "https://api.twitch.tv/kraken/streams/?client_id=" +
  client_ID +
  "&game=" +
  game +
  "&limit=" +
  limit +
  "&offset=" +
  offset;

var build = renderChannel(limit);
var request = xhr(_url, offset);