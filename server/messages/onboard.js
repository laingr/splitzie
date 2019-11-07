
//Welcome msg
//New Splitzie Flow: Desc, Date, Budget, Invite, Confirmation

exports.Welcome =
[
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "Hey there :wave:, I'm Splitzie! I'm here to help you organize shared group expenses across your team. From group outings to group gifts for Karen in accounting, just start a new Splitzie, invite who'd you like to include, and I'll take care of all the logistics."
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

exports.askDesc = 'How would you describe this Splitzie?';
exports.askBudget = 'How much is the total cost?';
exports.askDate = 'Until when do people have to opt in or out?';
exports.confirm = 'You are confirmed!';