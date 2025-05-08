const defResCard = require("../cards/defResCard");

// Handle the commands
async function handleCommand(context) {
  let message = context.activity.text;
  message = message.trim().toLowerCase();

  // configure workspace
  if (message === "bot -greet hi") {
    const card = await defResCard(
      "HI",
      "Click below, to provide your feedback",
      "click",
      "update_hi"
    );

    return card;
  }

  // connect workspace
  else if (message === "bot -greet hello") {
    const card = await defResCard(
      "HELLO",
      "Click below, to provide your feedback",
      "click",
      "update_hello"
    );

    return card;
  } else {
    // If the message doesn't match any command
    console.log("Unknown command:", message);
  }
}

module.exports = handleCommand;
