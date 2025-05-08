// send Activity (send message card) -----
async function sendActivity(context, adaptiveCard) {
  if (!adaptiveCard) {
    console.warn("⚠️ No adaptive card provided to send.");
    return;
  }

  // Send the Adaptive Card
  await context.sendActivity({
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: adaptiveCard,
      },
    ],
  });
}

// update Activity (update message card) ------
async function updateActivity(context, activityId, adaptiveCard) {
  if (!activityId) {
    console.warn("⚠️ No activity ID provided for update.");
    return;
  }

  if (!adaptiveCard) {
    console.warn("⚠️ No adaptive card provided for update.");
    return;
  }

  // Update the Adaptive Card
  const updatedActivity = {
    type: "message", // required
    id: activityId, // the activityId you are updating
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: adaptiveCard,
      },
    ],
  };

  await context.updateActivity(updatedActivity);
}

// open "modal/dialog" --> send task module -------
async function sendTaskModule(context, cardContent, cardTitle, cardHeight, cardWidth) {
  let payload = {
    title: cardTitle,
    height: cardHeight || "medium",
    width: cardWidth || "medium",
    card: {
      contentType: "application/vnd.microsoft.card.adaptive",
      content: cardContent,
    },
  };

  await context.sendActivity({
    type: "invokeResponse",
    value: {
      status: 200,
      body: {
        task: {
          type: "continue",
          value: payload,
        },
      },
    },
  });
}

// Close "modal/dialog" -----
async function closeTaskModule(context) {
  try {
    await context.sendActivity({
      type: "invokeResponse",
      value: {
        status: 200,
      },
    });
  } catch (error) {
    console.warn("❌ bot is not a part of conversation, closing module anyway");
  }
}


// // notifyUserByAdapter (later use to send notification to other user who installed your bot, and you have already store their email, conversationID somewhere in your side)
// // the function take (userEmails in an array, adaptivecard, adapter) 
// // "userEmails" gather "conversationID" of users based on "userEmail".
// // "adapter" use to send given "card" to those conversations ID's.

// async function notifyUserByAdapter(userEmails, card, adapter){
//   await Promise.all(
//     userEmails.map(async (userEmail) => {
//       const result = await gatherConversationIDFromEmail(userEmail);
//       if (result.status !== "success") return;
//       const conversationId = result.conversationID;
  
//       return adapter.continueConversation(
//         {
//           conversation: { id: conversationId },
//           serviceUrl: "https://smba.trafficmanager.net/emea/"
//         },
//         async (context) => {
//           await sendActivity(context, card);
//         }
//       );
//     })
//   );    
// }


// same above fuction☝️ like "notifyUserByAdapter" but without using "adapter"
// async function sendProactiveCard(context, serviceUrl, conversationId, adaptiveCard) {
//   try {
//     await context.adapter.continueConversation(
//       {
//         serviceUrl: serviceUrl,
//         conversation: { id: conversationId },
//       },
//       async (proactiveContext) => {
//         await proactiveContext.sendActivity({
//           attachments: [
//             {
//               contentType: "application/vnd.microsoft.card.adaptive",
//               content: adaptiveCard,
//             },
//           ],
//         });
//       }
//     );
//   } catch (error) {
//     console.error("❌ Error sending proactive card:", error);
//   }
// }

// module.exports = { sendActivity, updateActivity, sendTaskModule, closeTaskModule, notifyUserByAdapter, sendProactiveCard };
module.exports = { sendActivity, updateActivity, sendTaskModule, closeTaskModule };