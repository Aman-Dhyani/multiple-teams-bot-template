const authenticateBot = require("./authenticateBot");
const { getUserEmail } = require("./graphService");

async function getContext(context) {
  const botName = context.activity.recipient.name;
  const aadObjectId = context.activity.from.aadObjectId;
  const tenantId = context.activity.conversation.tenantId;
  const conversationID = context.activity.conversation.id;
  const serviceUrl = context._activity.serviceUrl;

  // Authenticate the bot
  const { client, botID, botPassword } = await authenticateBot(
    botName,
    context.res,
    serviceUrl
  );
  if (!client) {
    return null; // You can also throw an error if you prefer stricter control
  }

  // Retrieve current user email from graphAPI
  let userEmail;
  try {
    userEmail = await getUserEmail(aadObjectId, tenantId, botID, botPassword);
  } catch (error) {
    console.error("❌ Failed to retrieve email:", error.message);
    return null; // Or handle however you want
  }

  return {
    botName,
    botID,
    botPassword,
    client,
    aadObjectId,
    tenantId,
    conversationID,
    userEmail,
    serviceUrl
  };
}

module.exports = getContext;
