function feedBackResCard(data) {
  const { userFeedback, rating } = data;

  const adaptiveCard = {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "TextBlock",
        text: `**your feedback**: ${userFeedback || "No feedback provided."}`,
        wrap: true
      },
      {
        type: "TextBlock",
        text: `**Rating**: ${rating || "No rating given."} ⭐`,
        wrap: true
      },
      {
        type: "TextBlock",
        text: "Thanks for your feedback! 😊",
        wrap: true,
        spacing: "Large"
      }
    ]
  };

  return adaptiveCard;
}

module.exports = feedBackResCard;
