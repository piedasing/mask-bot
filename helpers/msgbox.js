// 忘記格式到這個網址找文件~~~
// https://developers.line.biz/en/reference/messaging-api/#message-objects

const msgbox = {
    text: function (text) {
        return {
            type: "text",
            text
        }
    },
    sticker: function (packageId, stickerId) {
        return {
            type: "sticker",
            packageId,
            stickerId
        }
    },
    image: function (originalContentUrl, previewImageUrl) {
        return {
            type: "image",
            originalContentUrl,
            previewImageUrl
        }
    },
    video: function (originalContentUrl, previewImageUrl) {
        return {
            type: "viedo",
            originalContentUrl,
            previewImageUrl
        }
    },
    audio: function (originalContentUrl, duration) {
        return {
            type: "audio",
            originalContentUrl,
            duration
        }
    },
    location: function (title, address, latitude, longitude) {
        return {
            type: "location",
            title,
            address,
            latitude,
            longitude
        }
    },
    imagemap: function (imageBaseUrl, altText, imageWidth, imageHeight, videoOriginalUrl, videoPreviewUrl, videoAreaX, videoAreaY, videoAreaWidth, videoAreaHeight, videoLinkUrl, videoLinkLabel, actions) {
        return {
            type: "imagemap",
            baseUrl: imageBaseUrl,
            altText,
            baseSize: {
                width: imageWidth,
                height: imageHeight
            },
            video: {
                originalContentUrl: videoOriginalUrl,
                previewImageUrl: videoPreviewUrl,
                area: {
                    x: videoAreaX,
                    y: videoAreaY,
                    width: videoAreaWidth,
                    height: videoAreaHeight,
                },
                externalLink: {
                    linkUrl: videoLinkUrl,
                    label: videoLinkLabel
                }
            },
            actions
            // actions: [
            //     {
            //         type: "uri",
            //         linkUri: "https://example.com",
            //         area: {
            //             x: 0,
            //             y: 586,
            //             widht: 520,
            //             height: 454
            //         }
            //     },
            //     {
            //         type: "message",
            //         text: "hello",
            //         area: {
            //             x: 520,
            //             y: 586,
            //             width: 520,
            //             height: 454
            //         }
            //     }
            // ]
        }
    },
    template: function (altText, template) {
        return {
            type: "template",
            altText,
            template
        }
    }
};

module.exports = msgbox;
