const bots = require("../bots");
const { ConnectorClient, MicrosoftAppCredentials } = require("botframework-connector");

async function authenticateBot(botName, res, serviceUrl) {
  // finding bot in bots.js
  const bot = bots.find((b) => b.botName === botName);  

  // handling if Bot not found
  if (!bot) {
    return res.status(404).json({ message: "Bot not found" });
  }

  // if bot exists, retrieve its ID and Secret to validate MicrosoftAppCredentials
  const { botID, botPassword } = bot;
  MicrosoftAppCredentials.trustServiceUrl(serviceUrl);
  const credentials = new MicrosoftAppCredentials(botID, botPassword);

  // handling token
  try {
    await credentials.getToken();
  } catch (authError) {
    return res.status(401).json({
      message: "Invalid bot credentials",
      error: authError.message,
    });
  }

  // returning client and bot details
  return { client: new ConnectorClient(credentials, { baseUri: serviceUrl }), botID, botPassword };
}

module.exports = authenticateBot;