function feedbackCard() {
  const adaptiveCard = {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "Input.Text",
        id: "userFeedback",
        placeholder: "Write your feedback here...",
        isMultiline: true,
        label: "Your Feedback",
        spacing: "Large",
        isRequired: true,
        errorMessage: "Feedback is required.",
      },
      {
        type: "Input.ChoiceSet",
        id: "rating",
        label: "Rate your experience",
        isMultiSelect: false,
        style: "compact",
        spacing: "Large",
        choices: [
          { title: "⭐", value: "1" },
          { title: "⭐⭐", value: "2" },
          { title: "⭐⭐⭐", value: "3" },
          { title: "⭐⭐⭐⭐", value: "4" },
          { title: "⭐⭐⭐⭐⭐", value: "5" },
        ],
        isRequired: true,
        errorMessage: "Please select a rating.",
      },
      {
        type: "ActionSet",
        spacing: "Large",
        horizontalAlignment: "Left",
        actions: [
          {
            type: "Action.Submit",
            title: "Submit",
            style: "positive",
            data: {
              action: "submit_feedback",
            },
          },
        ],
      },
    ],
  };

  return adaptiveCard;
}

module.exports = feedbackCard;