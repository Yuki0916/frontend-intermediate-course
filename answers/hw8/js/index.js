require("../stylus/style.stylus");
var I18N = {
  "en": require("./lang/lang-en.js"),
  "zh-tw": require("./lang/lang-zh-tw.js")
}
var game = "League%20of%20Legends";
var client_ID = "y7kmxph29brxczhdk9dn9ardapegmd";
var limit = 20;
var offset = 0;
var lang = "zh-tw";

renderChannel(limit);
xhr(url(client_ID, limit, offset, lang), offset);

function remove(){
  var body = document.querySelector(".flex-container");
  body.innerHTML = '';
}
function i18n(_lang){
  var body = document.querySelectorAll(".switch h1");
  body["0"].textContent = I18N[_lang]["TITLE"] ;
  lang = _lang ;
  remove();
  renderChannel(limit);
  offset = 0 ; //初始化
  xhr(url(client_ID, limit, offset, lang), offset);
}
function renderChannel(limit) {
  var flex_container = document.querySelector(".flex-container");
  for (var c = 0; c < limit; c++) {
    flex_container.innerHTML += getChannel();
  }
}
function getChannel() {
  return `
  <div class="channel">
    <div class="img">
      <div class="defaultChannel_img"></div>  
      <img class="channel_img">
    </div>
    <div class="user">
      <div class="defaultUser_img"></div>
      <img class="user_img">
      <div class="user_info">
        <div class="user_title"></div>
        <div class="user_name"></div>
      </div>
    </div>
  </div>`;
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
function url(client_ID, limit, offset, lang) {
  return `https://api.twitch.tv/kraken/streams/?client_id=${client_ID}&game=${game}&limit=${limit}&offset=${offset}&language=${lang}`;
}
window.addEventListener("scroll", function(event) {
  if (
    window.pageYOffset + window.innerHeight >
    document.body.scrollHeight - 200
  ) {
    renderChannel(limit);
    offset += limit;
    xhr(url(client_ID, limit, offset, lang), offset);
  }
});
document.getElementById("b1").addEventListener("click", function(event){
  i18n("zh-tw");
});
document.getElementById("b2").addEventListener("click", function(event){
  i18n("en");
});