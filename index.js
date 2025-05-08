const express = require("express");
require("dotenv").config();

// pkgs
const { BotFrameworkAdapter } = require("botbuilder");

// required files
const bots = require("./bots");
const handleInstallation = require("./handleContext/handleInstallation");
const handleCommand = require("./handleContext/handleCommand");
const handleContext = require("./handleContext/handleContext");
const { sendActivity } = require("./context/activity");

// Validation & authenticating bot and also retrive user MS account details(based on permissions)
const getContext = require("./services/getContext");

// variables
const app = express();
const port = process.env.PORT || 3002;

// middleware
app.use(express.json());

// GET
app.get("/template", (req, res) => {
  res.send("bot is running").status(200);
});

// console.log(bots);

// looping all bots (if multiple bot exists in bots.js)
bots.forEach((bot) => {
  // adapter
  const adapter = new BotFrameworkAdapter({
    appId: bot.botID,
    appPassword: bot.botPassword,
  });

  // Dynamic Route (to communicate bot) /api/messages/planeso_bot
  const route = `/template/api/messages/${bot.botRoute}`;
  // console.log(route);

  // POST
  app.post(route, async (req, res) => {
    // later can use for any kind of incoming webhook
    if (req.body.event) {
      // incoming webhook based communication
    }

    // context based communication
    else {
      await adapter.processActivity(req, res, async (context) => {
        // Validation & authenticating bot and also retrive user MS account details(based on permissions)
        const contextData = await getContext(context);
        if (!contextData) return;
        
        // (installing bot) welcoming/first time install functions
        if (context.activity.type === "conversationUpdate") {
          const card = await handleInstallation(contextData);
          await sendActivity(context, card);
        }

        // (messaging bot) message command 
        else if (context.activity.type === "message") {
            const card = await handleCommand(context);
            await sendActivity(context, card);
        }

        // (interacting with bot) invoking action 
        else if (context.activity.type === "invoke") {
            await handleContext(context, contextData, adapter); // parameter "adapter" isn't using yet in this template
        }

        // else
        else {
          return "no activity found";
        }
      });
    }
  });
});

// Start server
app.listen(port, () =>
  console.log(`templateBot is running on http://localhost:${port}/template`)
);