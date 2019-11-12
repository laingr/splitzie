//Admin reminder about due date
//Guest reminder about due date
//Guest reminder about payment (if not recieved)

exports.sendReminder = function (desc, amount, date, uuid) {
  const reminder =
  [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Hey again! Just wanted to remind you about a Splitzie you've been invited to. A response has been requested by Tomorrow EOD.`
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `✨✨✨\n${desc}`
      }
      // ,
      // "accessory": {
      //   "type": "image",
      //   "image_url": "https://picsum.photos/200",
      //   "alt_text": "alt text for image"
      // }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:dollar:\n*$${amount}*`
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "I'm In!",
            "emoji": true
          },
          "value": `${uuid}`
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "No thanks.",
            "emoji": true
          },
          "value": `${uuid}`
        }
      ]
    }
  ];
  return reminder;
}