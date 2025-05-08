require("dotenv").config();

const bots = [
  {
    botName: process.env.BOT1_NAME,
    botID: process.env.BOT1_ID,
    botPassword: process.env.BOT1_PASSWORD,
    botRoute: process.env.BOT1_ROUTE,
  },
  // {
  //   botName: process.env.BOT2_NAME,
  //   botID: process.env.BOT2_ID,
  //   botPassword: process.env.BOT2_PASSWORD,
  //   botRoute: process.env.BOT2_ROUTE,
  // },
];

module.exports = bots;
