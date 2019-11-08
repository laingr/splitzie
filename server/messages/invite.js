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
        "text": `Hey there! You've been invited to a Splitzie! Here's the info - let me know if you'd like to particiapte by *${date}* and I'll keep track of everything`
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `${desc}\n:star::star::star::star:`
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
        "text": `*$${amount}*\n:dollar::dollar:`
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

  exports.confirmInvitesSent = 'Yay, invites have been sent!';
