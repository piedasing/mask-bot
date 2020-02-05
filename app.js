const express = require("express");
const bot = require("./bot");

const app = express();
const linebotParser = bot.parser();

app.get("/test", (req, res) => {
    res.send("bot test route ok");
});
// -------------------------------------------------------------
// 監聽 linebot 的 callback
app.post("/linewebhook", linebotParser);

module.exports = app;
