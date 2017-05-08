$(function() {
  $.ajax({
    headers: {
      "Client-ID": "y7kmxph29brxczhdk9dn9ardapegmd"
    },
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20",
    success: function(data) {
      for (var c = 0; c < data.streams.length; c++) {
        $("div#" + c + ".channel" + ">" + "div.channel_img").css(
          "background-image",
          "url(" + data.streams[c].preview.medium + ")"
        );
        $("div#" + c + ".channel" + ">" + "div.channel_img").css(
          "background-size",
          "100% 100%"
        );
        $("div#" + c + ".channel>div.user>div.user_img").css(
          "background-image",
          "url(" + data.streams[c].channel.logo + ")"
        );
        $("div#" + c + ".channel>div.user>div.user_info>div.user_title").append(
          data.streams[c].channel.status
        );
        $("div#" + c + ".channel>div.user>div.user_info>div.user_name").append(
          data.streams[c].channel.name
        );
      } // 依序印出所有頻道資訊
    },
    error: function() {
      console.log("fail");
    }
  });
});