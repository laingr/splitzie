//Admin recap
//Guest recap

exports.sendReview = function (adminChannel, desc, amount, people) {
  const reminder =
  [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `You're Splitzie closed today! ${people} people joined, meaning you're collecting $${amount}.`,
      }
    },
    {
      "type": "divider"
    }
  ];
  return reminder;
}