class FlexMessage {
    constructor() {
        this.value = {};
        this.bubble = [];
    }

    create() {
        this.value = {
            "type": "flex",
            "altText": "this is a flex message",
            "contents": {
                "type": "carousel",
                "contents": []
            }
        }
    }

    createBubble() {
        this.value.contents.contents.push({
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": this.bubble
            }
        });
        this.bubble = [];
    }

    setCategory(category) {
        this.bubble.push({
            "type": "text",
            "text": category,
            "weight": "bold",
            "color": "#1DB446",
            "size": "sm"
        });
    }

    setStoreName(name) {
        this.bubble.push({
            "type": "text",
            "text": name,
            "weight": "bold",
            "size": "xxl",
            "margin": "md"
        });
    }

    setAddress(address) {
        this.bubble.push({
            "type": "text",
            "text": address,
            "size": "xs",
            "margin": "md",
            "color": "#aaaaaa",
            "wrap": true
        });
    }

    setSeparator() {
        this.bubble.push({
            "type": "separator",
            "margin": "xxl"
        });
    }

    setInfo(data) {
        let contents = [];
        data.forEach(item => {
            contents.push({
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": item.type,
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": item.value,
                    "size": "sm",
                    "color": "#111111",
                    "align": "end"
                  }
                ]
            });
        });
        this.bubble.push({
            "type": "box",
            "layout": "vertical",
            "margin": "xxl",
            "spacing": "sm",
            "contents": contents
        });
    }

    setUpdateTime(time) {
        this.bubble.push({
            "type": "box",
            "layout": "horizontal",
            "margin": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "最後更新時間",
                    "size": "xs",
                    "color": "#aaaaaa",
                    "flex": 0
                },
                {
                    "type": "text",
                    "text": time,
                    "color": "#aaaaaa",
                    "size": "xs",
                    "align": "end"
                }
            ]
        });
    }
}

module.exports = FlexMessage;
