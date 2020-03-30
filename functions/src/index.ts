import * as functions from 'firebase-functions';

import { WebClient } from '@slack/web-api';
const bot = new WebClient(functions.config().slack.token);

//for background jobs > 3 sec
const { PubSub } = require('@google-cloud/pubsub');
const pubsubClient = new PubSub();

export const myBot = functions.https.onRequest( async (req, res) => {
    
    //Validate signature
    // verifySlackSignature(req);

    const data = JSON.stringify(req.body);
    const dataBuffer = Buffer.from(data);

    await pubsubClient
            .topic('slack-channel-join')
            .publisher
            .publish(dataBuffer);
    
    res.sendStatus(200);
    //Request from Slack
    // const { challenge } = req.body;

    // //Response from you
    // res.send({ challenge });
});

export const slackChannelJoin = functions.pubsub.topic('slack-channel-join')
.onPublish(async (message, context) => {
    const { event } = message.json;
    const { user, channel } = event;

    //IDs for the channels you plan on working w
    const generalChannel = 'C0109J4A0F5'; //got it from the url, may or may not be the general channel id
    const newChannel = '#wooo-new-channel';

    //Throw error if not on the general channel
    if (channel !== generalChannel) {
        throw Error() //or just return null from the function
    }

    //get full slack profile
    const userResult = await bot.users.profile.get({ user });
    const { email, display_name } = userResult.profile as any;

    //Invite them to a new channel
    const invite = await bot.channels.invite({
        channel: newChannel,
        user 
    });

    //send a message
    const chatMessage = await bot.chat.postMessage({
        channel: newChannel,
        text: 'Hey! ${display_name}! So glad to have you on my slack!'
    })


});







// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });