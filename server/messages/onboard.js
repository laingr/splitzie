
exports.Welcome =
[
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
      "text": `:wave: Hey there, I'm Splitzie! I'm here to help you organize and plan any upcoming shared group expenses. 
      \nI can help you with all sort of things from group outings to shared group gifts and more!
      \nTo start a new Splitzie, I'll ask a couple of questions and then take care of the rest.`
		}
	},
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "Would you like to start a new Splitzie? "
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"text": "Let's go!",
				"emoji": true
			},
			"value": "new_pool"
		}
	}
]

exports.dashboard =
[
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "Click to access your Splitzie dashboard --> "
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"text": "Ok",
				"emoji": true
			},
			"url": "http://localhost:8080"
		}
	}
]

exports.askDate =
[
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "When should people opt in by?"
		},
		"accessory": {
			"type": "datepicker",
			"initial_date": "2019-11-11",
			"placeholder": {
				"type": "plain_text",
				"text": "Select a date",
				"emoji": true
			}
		}
	}
]

exports.askDesc = `In one message, what's this Splitzie for? This will be sent to your guests, so try to be as descriptive as you can :)`;
exports.askBudget = `What's the expected budget you'd like people to contribute?`;
exports.confirm = `Perfect - I've created a Splitzie for you with the information below:\n\n`;
exports.invite = `Now time to invite others. Let me know who you want to include by sending me their slack '@' handle.`;