const defResCard = require("../cards/defResCard");

// Handle the commands
async function handleInstallation(contextData) {
  /* 
    1. later you can store userEmail & conversationID somewhere when users will install bot in their teams,  
    2. later you can perform specific task like "send message/proactive notification" to your bot's users in their bot conversation based on their emails 
  */
  const { userEmail, conversationID } = contextData;
  console.log(userEmail, conversationID);

  // handleInstallation card
  const card = await defResCard(
    "Welcome to the bot!",
    "click below buttons to know bots reply commands",
    "hi", // Primary button title
    "hi_cmd", // Primary button action
    "hello", // Secondary button title
    "hello_cmd" // Secondary button action
  );

  return card;
}

module.exports = handleInstallation;