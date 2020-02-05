const linebot = require("linebot");
const axios = require("axios");
const dayjs = require("dayjs");

const { config, log, msgbox } = require("./helpers");
const FlexMessage = require("./models/FlexMessage");

const bot = linebot({
    ...config.linebot
});
// -------------------------------------------------------------
// 當有人傳送訊息給 bot 時
bot.on("message", function(event) {
    log("message: \n", event);
    onMessage({ event });
});

// 當有人加入 bot 好友時
bot.on("follow", function(event) {
    log("follow: \n", event);
});
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
async function onMessage(param) {
    const { event } = param;
    const { message, source } = event;
    const { userId } = source;

    log("收到訊息\n", message);
    switch (message.type) {
        case "text":
            replayTextMessage(userId, message);
            break;
        case "location":
            replayLocationMessage(userId, message);
            break;
    }
};
// -------------------------------------------------------------
// 回覆訊息 (其他種類)
async function replayTextMessage(userId, message) {
    let replyMsg = "發送 LINE 的位置訊息，即可取得附近的藥局資訊。";

    const res = await bot.push(userId, replyMsg).catch(error => { log(error); });
    log("訊息已送出", replyMsg);
};

async function replayLocationMessage(userId, message) {
    const { latitude, longitude } = message;

    const res = await axios({
        url: `https://api.maskhelp.info/api/supply?lat=${latitude}&lng=${longitude}&radius=5000&page=0&size=100&maskStatus=AVAILABLE`,
        method: "GET"
    });

    if (res.data.content.length <= 0) {
        await bot.push(userId, "附近店家皆無口罩").catch(error => { log(error); });
        return;
    }

    const flexMessage = new FlexMessage();
    flexMessage.create();
    // flexMessage.setCategory(res.data.content[0].category);
    // flexMessage.createBubble();
    res.data.content.forEach(data => {
        flexMessage.setCategory(data.category);
        flexMessage.setStoreName(data.name);
        flexMessage.setAddress(data.address);
        flexMessage.setSeparator();
        flexMessage.setInfo([
            { type: "城市", value: data.city },
            { type: "地區", value: data.area },
            { type: "成人口罩", value: data.maskStatus },
            { type: "兒童口罩", value: data.childrenMaskStatus }
        ]);
        flexMessage.setSeparator();
        const datetime = dayjs(data.updatedTime).format("YYYY-MM-DD HH:mm:ss");
        flexMessage.setUpdateTime(datetime);
        flexMessage.createBubble();
    });

    await bot.push(userId, flexMessage.value).catch(error => { log(error); });
    log("訊息已送出", flexMessage.value);
};


module.exports = bot;
