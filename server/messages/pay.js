'use strict';

exports.payReminder = (desc, amount, date, uuid) => {
  let admin = 'James';
  const payReminder = 
  [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:wave: Hey there, here's a friendly reminder that you owe ${admin} $${amount} for the Splitzie "${desc}"... Once you've paid ${admin}, just let me know and I'll leave you alone :).`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Have you paid? "
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Yup!",
          "emoji": true
        },
        "value": uuid
      }
    }
  ];
  return payReminder;
}

exports.confirmPay = `Thanks :) - have a great day.` 