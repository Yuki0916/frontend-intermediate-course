var game = 'League%20of%20Legends'
var clientID = 'y7kmxph29brxczhdk9dn9ardapegmd'
var limit = 20
var offset = 0
var lang = 'zh-tw'

renderChannel(limit)
xhr(url(clientID, limit, offset, lang), offset)

function remove () {
  var body = document.querySelector('.flex-container')
  body.innerHTML = ''
}

function i18n (_lang) {
  var body = document.querySelectorAll('.switch h1')
  body['0'].textContent = window.I18N[_lang].TITLE
  lang = _lang
  remove()
  renderChannel(limit)
  offset = 0  // 初始化
  xhr(url(clientID, limit, offset, lang), offset)
}
function renderChannel (limit) {
  var flexContainer = document.querySelector('.flex-container')
  for (var c = 0; c < limit; c++) {
    flexContainer.innerHTML += getChannel()
  }
}
function getChannel () {
  return `
  <div class="channel">
    <div class="img">
      <div class="defaultchannelImg"></div>  
      <img class="channelImg">
    </div>
    <div class="user">
      <div class="defaultUser_img"></div>
      <img class="user_img">
      <div class="user_info">
        <div class="user_title"></div>
        <div class="user_name"></div>
      </div>
    </div>
  </div>`
}
function xhr (url, offset) {
  var httpRequest
  // build XMLHttpRequest
  if (window.XMLHttpRequest) {
    httpRequest = new window.XMLHttpRequest()
  } else {
    try {
      httpRequest = new window.ActiveXObject()
    } catch (e) {
      console('XMLHttpRequest not supported')
    }
  }
  // Request Start
  httpRequest.open('GET', url)
  httpRequest.onload = function () {
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
      // status success!
      // JSON
      var data = JSON.parse(httpRequest.response)
      // run
      dataIntoModel(data, offset)
    } else {
      // We reached our target server, but it returned an error
    }
  }
  httpRequest.onerror = function () {
    // There was a connection error of some sort
  }
  httpRequest.send()
}
function dataIntoModel (data, offset) {
  var channelImg = document.querySelectorAll('.channelImg')
  var channelLogo = document.querySelectorAll('.user_img')
  var channelTitle = document.querySelectorAll('.user_title')
  var channelName = document.querySelectorAll('.user_name')
  for (var c = 0; c < data.streams.length; c++) {
    channelImg[c + offset].addEventListener(
      'load',
      function () {
        this.style.opacity = 1
      },
      true
    )
    channelImg[c + offset].src = data.streams[c].preview.medium
    channelLogo[c + offset].addEventListener(
      'load',
      function () {
        this.style.opacity = 1
      },
      true
    )
    channelLogo[c + offset].src = data.streams[c].channel.logo
    channelTitle[c + offset].innerHTML = data.streams[c].channel.status
    channelName[c + offset].innerHTML = data.streams[c].channel.display_name
  }
}
window.addEventListener('scroll', function (event) {
  if (
    window.pageYOffset + window.innerHeight >
    document.body.scrollHeight - 200
  ) {
    renderChannel(limit)
    offset += limit
    xhr(url(clientID, limit, offset, lang), offset)
  }
})
document.getElementById('b1').addEventListener('click', function () {
  i18n('zh-tw')
})
document.getElementById('b2').addEventListener('click', function () {
  i18n('en')
})
function url (clientID, limit, offset, lang) {
  return `https://api.twitch.tv/kraken/streams/?client_id=${clientID}&game=${game}&limit=${limit}&offset=${offset}&language=${lang}`
}
