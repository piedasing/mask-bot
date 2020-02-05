// server 監聽 port
const port = process.env.PORT;

// linebot 設定
const linebot = {
  channelId: process.env.LINEBOT_CHANNEL_ID,
  channelSecret: process.env.LINEBOT_CHANNEL_SECRET,
  channelAccessToken: process.env.LINEBOT_CHANNEL_ACCESSTOKEN
};

module.exports = {
    port,
    linebot
}
