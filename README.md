### Follow these 6 steps to setup your own teams **app** backend logic as **bot** without using azure functions.


# Step 1 :- 
Having app in MS-teams.
![image](https://github.com/user-attachments/assets/8d05ffb7-a2ed-4a0f-b56b-7d176fc40c17)


# Step 2 :-
Having a Bot also MS-teams.
![image](https://github.com/user-attachments/assets/da063a70-0ac3-4d97-8b5e-7329d8e28ba7)

# Step 3 :- 
- Copy Name, **App ID** and **Client secret** of the bot.
- paste those details in .env file.
![image](https://github.com/user-attachments/assets/7c3cdc47-4a85-4b91-9d31-d42a6bc41cee)
note:- you can put anything as **bot route** keep in mind later, that **bot route** will define specific dynamic endpoint to you bot.

![image](https://github.com/user-attachments/assets/b16b1c1c-f066-41c5-8571-c523d725dfa0)
"http://localhost:3002/template/api/messages/whateverBotRoutOfThatBot"

# Step 4 :- Now, 
  1. run this template over https (bcs azure/teams support bot to run only for ssl), follow these steps.
  2. npm install (all dependencies)
    In my case I am using pm2 and nginx. after doing
      - pm2 start index.js,
      - service nginx start,
      - pm2 logs

  you will see this.
  ![image](https://github.com/user-attachments/assets/7056cb77-74fa-44a5-a318-8955a8314a8c)


  4. copy "https://yourdomain.com/template/api/messages/whateverBotRoutOfThatBot"
  5. paste it to bots endpoint configuration

  for azure
  ![image](https://github.com/user-attachments/assets/8c5205b1-4bbe-4daa-97c9-97eaf8b7ce2f)

  for teams Dev portal
  ![image](https://github.com/user-attachments/assets/a49ff7ea-6f8b-4d0b-8f74-64a817ad490f)


# step 5 :- Connect your **app** with you **bot**
  1. visit teams app dev portal
  2. visit your app
     ![image](https://github.com/user-attachments/assets/82d6ca40-57ad-46e6-b72b-73bffb0040fc)

  3. open App Features tab and click on Bot
     ![image](https://github.com/user-attachments/assets/fe281b7b-47f0-4b3a-8a5e-3b8cd1fd7176)

  4. choose your bot among other bots
     ![image](https://github.com/user-attachments/assets/ece239de-bd4c-4866-b067-b0e3eaf65a7b)

  5. select scope also (personal is good for me, so we dont have to install bot every time for each team channels or group)
     ![image](https://github.com/user-attachments/assets/29362dd9-05c9-4daa-bb83-c344ece2b755)

  6. save all.

# step 6 :- Give you **app** some important permission like
![image](https://github.com/user-attachments/assets/9bb21056-aa9d-4484-8c5b-4fb47268d582)

note :- these permissions let bot/app to use MS graph API, in this template this is only using for gathering user email, when user install bot to perform messaging tasks.


# Working & Features

1. installing/adding bot (handleInstallation)
  - bot will welcome you
  ![image](https://github.com/user-attachments/assets/2100c0ea-69ce-4757-9548-0349db933609)

  - also show your email & bot converationID on console. (which you can customize to use later)
    ![image](https://github.com/user-attachments/assets/d56b8588-3322-4275-aef2-a9566c99051b)
    
    e.g. you can store (userEmail, conversationID) of whoever install your bot, then later you can send them messages through bot by using Bot's conversationID
    based on their email. like sending new update or specific message to your community😊.


  - welcome adaptive card will contain 2 button "hi" and "hello"
  ![image](https://github.com/user-attachments/assets/401a8388-e325-406d-b778-4b86095bab71)


2. invoke/interaction with bot (handleContext/handleInteraction)
   - clicking on "hi" and "hello" from welcome message will open a modal/dialog contains bot commands.

     for hi ("bot -greet hi")
     ![image](https://github.com/user-attachments/assets/fc23e908-0801-4dc8-a89f-d379c846e2ac)
     
     
     for hello ("bot -greet hello")
     ![image](https://github.com/user-attachments/assets/b13d5433-7ac8-4dee-9bb3-b7e49b48104a)
    

3. messageing to bot (handleCommand)

   - message those commands to bot "bot -greet hello"
     ![image](https://github.com/user-attachments/assets/db09ecb4-7f71-4eac-a881-bdf7a92655c4)

   - bot will response with greet and a feedback btn
     ![image](https://github.com/user-attachments/assets/539bff31-6a5f-4045-b0db-6d0d71b82d69)

   - click will open modal/dialog like this
    ![image](https://github.com/user-attachments/assets/b1f0f8ca-895f-4861-b292-56aa4c0a0368)

   - clicking submit will close modal and update that adaptive card which you use earlier to open this modal/dialog
    ![image](https://github.com/user-attachments/assets/72b914af-5892-415d-8984-c834776a54d0)


At the end this bot's template come with some basic feature like
1. handling instatllation
2. handling message/commnds reply
3. handling Context/interaction
4. sending Adaptive card
5. updating Adaptive card
6. Toggling modal/dialog
7. handle multiple bots (add as many in .env file)
8. including handle "message extensions" commented line of code. so you can handle this type of stuff👇
  ![image](https://github.com/user-attachments/assets/e451093e-e07c-41e8-8ec7-f9615fded449)


// check current conversation isBotsConversation(context) on handleContext file ---------
// (⚠️⚠️⚠️ --- !important cases 🤖bot response based on "conversation ID"🤖 -- ⚠️⚠️⚠️)

when user perform something in bot's conversation/bot's "1to1" chat
- then bots usually response user in its conversation bcs bot is part of its own conversation)
- but if a user perform bot's tasks out of "1to1" chat, like (message extension in teams) from other conversation/chat, group, channel, etc. 
then bot doesn't know where to reply ('because bot may not be part of that conversation/chat').

❌❌ until you manually install bot in all chats, group, teams one by one ❌❌ (no way right) but we set our scope only personal

so, preserve the conversation ID manually.
- we have to override that **conversation ID** with **bots conversation id** but we cannot find it in context, because we are on other chat/conversation right.
so, 

1. we run isBotsConversation(context) - it tell us we are "user-to-bot" or "user-to-group", "user-to-chat", "user-to-channel", etc
1. If we are not inside bot tab, then simply take "userEmail" in this situation.
2. and retrive "bot's conversationID" from "database or whatever" where we store (userEmail & Bot's conmversationID) earlier based on "userEmail".
3. then replace non bot conversationID with retrieved one.

note:- you can store userEmail & Bot's conmversationID when anyone install your bot after some customization in handleContext/handleInstallation.js file.

summary :- 
performing "message exention" in bot conversation "user-to-Bot", will give response in that conversation.
performing "message exention" in other conversation "group/user-to-other-person", will give response in bot's conversation.

handleContext.js
/* 
  async function isBotsConversation(context) {
    try {
      const members = await context.adapter.getConversationMembers(context);
      if (members) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
*/

/* 
const isWeAreInBotsConversation = await isBotsConversation(context);
  if(isWeAreInBotsConversation === false){
    resConvID = await retrieveUsersConversationID(userEmail);
     conversationID = resConvID.conversationID
  }
        
 console.log("current Conversation ID : " + conversationID); 
*/

You can customize it to another level
Features




  
