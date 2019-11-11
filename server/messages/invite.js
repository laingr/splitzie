//Invited msg with in/out action
//Confirmation & pay instructions
//Invite confirmed alert to admin

exports.sendInvite = function (desc, amount, date, uuid) {
  const invite =
  [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Hey there! You've been invited to a Splitzie! \n\nI've outlined a description and expected budget per person below. Please respond by *${date}* if you'd like to be included :)`
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `🥳 ${desc}`
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
        "text": `💵 The expected budget per person is *$${amount}*`
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
  return invite;
}

  exports.confirmInvitesSent = `Yay 🙌, they've been invited!`;
  exports.confirmInvite = '👍 Great - Adding you to the list.';
  exports.declineInvite = 'No problem.';
