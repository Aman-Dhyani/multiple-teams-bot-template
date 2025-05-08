async function commandCards(actionName) {
  let command = "bot -greet hi";
  let message = "hi";

  if (actionName === "hello_cmd") {
    command = "bot -greet hello";
    message = "hello";
  }

  const adaptiveCard = {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "TextBlock",
        text: `Message this command to bot, bot will say "${message}".`,
        weight: "default",
        wrap: true,
      },
      {
        type: "Container",
        spacing: "Small",
        style: "emphasis",
        items: [
          {
            type: "TextBlock",
            text: `\`${command}\``,
            wrap: true,
            fontType: "Monospace",
            spacing: "None"
          }
        ]
      },
    ],
  };

  return adaptiveCard;
}

module.exports = commandCards;