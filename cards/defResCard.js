async function defResCard(greeting, subText, primaryTitle, primaryAction, secondaryTitle = null, secondaryAction = null) {
  const actions = [
    {
      type: "Action.Submit",
      title: primaryTitle,
      data: {
        msteams: {
          type: "task/fetch",
        },
        action: primaryAction,
      },
    },
  ];

  if (secondaryTitle && secondaryAction) {
    actions.push({
      type: "Action.Submit",
      title: secondaryTitle,
      data: {
        msteams: {
          type: "task/fetch",
        },
        action: secondaryAction,
      },
    });
  }

  const adaptiveCard = {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "TextBlock",
        text: greeting,
        weight: "Bolder",
        size: "Large",
      },
      {
        type: "TextBlock",
        text: subText,
        wrap: true,
      },
      {
        type: "TextBlock",
        text: " ", // acts as a spacer
        spacing: "Medium",
        separator: true
      }
    ],
    actions: actions,
  };

  return adaptiveCard;
}

module.exports = defResCard;
