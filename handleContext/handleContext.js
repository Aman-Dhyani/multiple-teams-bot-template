// messaging mechanism
const { updateActivity, sendTaskModule, closeTaskModule } = require("../context/activity");

// adaptive cards
const commandCards = require("../cards/commandCards");
const feedBackResCard = require("../cards/feedBackResCard");
const feedbackCard = require("../cards/feedbackCard");

// check current conversation isBotsConversation(context) ---------
// (⚠️⚠️⚠️ --- !important cases 🤖bot response based on "conversation ID"🤖 -- ⚠️⚠️⚠️)

/*  when user perform something in bot's conversation/bot's "1to1" chat 
(then bots usually response user in its conversation bcs bot is part of its own conversation). 

but 

if a user perform bot's tasks out of "1to1" chat, like (massage extension in teams) from other conversation/chat,group,etc. 
then bot doesn't know where to reply ('because bot may not be part of that conversation/chat').

❌❌ until you manually install bot in all chats, group, teams one by one ❌❌ (no way right) 
so set your app which later connect to this logic as it not give option like install in teams, install in chat/group. 

"uncheck those from temas developer portal" and let bots frontend app give install button only.


and preserve the conversation ID manually.
(so solution is we will override that conversation ID with bots conversation id) but we can't find it in context, because we are on other chat/conversation rigt.
so, 

1. we will simply take "userEmail" for this kind of condition.
2. and retrive our "bot's conversationID" from "database or whatever" where we store earlier based on "userEmail".
note:- bot also able to store userEmail & Bot's conmversationID when user install out bot.

and then whatever we perform with bot out of its 1to1 chat, we will get response in our bot conversation. 
no mater we are in bot conversation 1v1 or out of bot conversation like in other group, chat where bot isn't install, 
but we peforming "message extenstion" task of that bot in there.

summary :- 
performing "message exention" in bot conversation "user-to-Bot", will give response in that conversation.
performing "message exention" in other conversation "group/user-to-other-person", will give response in bot's conversation.

*/
// async function isBotsConversation(context) {
//   try {
//     const members = await context.adapter.getConversationMembers(context);
//     if (members) {
//       return true;
//     }
//   } catch (error) {
//     return false;
//   }
// }

// Get context data
async function handleContext(context, contextData, adapter) {
  // let { botName, userEmail, conversationID, serviceUrl } = contextData;

  try {
    // const isWeAreInBotsConversation = await isBotsConversation(context);
    // if(isWeAreInBotsConversation === false){
    //   resConvID = await retrieveUsersConversationID(userEmail);
    //   conversationID = resConvID.conversationID
    // }

    // console.log("current Conversation ID : " + conversationID);

    const task = context._activity.name;
    const activityData = context.activity.value.data || context._activity.value;
    const action = activityData?.action;
    const activityId = context.activity?.replyToId || context.activity?.id;
    // console.log(task);
    // console.log(action);

    // handle Modals ----
    async function handleModals(action) {
      // hi command modal/dialog
      if (action === "hi_cmd") {
        const cardContent = await commandCards(action);
        await sendTaskModule(context, cardContent, "Hi Command Modal");
      } 
      
      // hello command modal/dialog
      else if (action === "hello_cmd") {
        const cardContent = await commandCards(action);
        await sendTaskModule(context, cardContent, "Hello Command Modal");
      } 
      
      // feedback modal/dialog
      else if (action === "update_hi" || action === "update_hello") {
        const cardContent = await feedbackCard(action);
        await sendTaskModule(context, cardContent, "Feedback Modal", 300);
      } // await sendTaskModule(context, cardContent, "Hi command modal", 200, 200); you can pass modal height width also
    }

    // handle Submit ----
    async function handleSubmit(action) {
      if (action === "submit_feedback") {
        // console.log(activityData); -- feedback data
        closeTaskModule(context); // -- closing modal/dialog
        const cardContent = await feedBackResCard(activityData);
        await updateActivity(context, activityId, cardContent); // update bot reply to fedback response
      }
    }

    // Handle interaction ---------------------------
    // Handle task/fetch (loading dialog)
    if (task === "task/fetch"){ handleModals(action);}
    
    // Handle task/submit (interacting with dialog)
    else if (task === "task/submit" || task === "composeExtension/submitAction"){ handleSubmit(action);}
  } catch (error) {
    console.error("❌ Error in handleContext:", error);
  }
}

module.exports = handleContext;
