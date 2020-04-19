require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios');

var mysql = require('mysql');

var bot = new SlackBot({
    name: 'butterfly',
    token: 'xoxb-1009616333155-1059290081506-kgV6V1oqK6zRqOv2LUsujPyH'
    //process.env.TOKEN
});

const pool = mysql.createPool({
    host: '162.243.235.211',
    user: 'user345',
    password: 'Password1@',
    database: 'db345',
});

if (!bot.token) {
    console.log(`There has been an issue w the token`);
    // console.log(chalk`{red.bold TOKEN is not defined!}`);
    // console.log(`Please set your environment variables with appropriate token.`);
    // console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
    process.exit(1);
}

// console.log(chalk.green(`Your token is: ${bot.token.substring(0,4)}...`));
console.log(`Your token is: ${bot.token.substring(0, 4)}...`);

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':butterfly:'
    }

    bot.postMessageToChannel('general', 'Yay I work!', params);
});

//Error handler
bot.on('error', (err) => console.log(err));

async function getStarCount(data) {
    let starfunction = `SELECT starcount FROM Users WHERE id = '${data.user}'`;
    return new Promise((resolve, reject) => {
        pool.query(starfunction, function (err, result, fields) {
            if (err) reject(err);
            resolve(Number(result[0].starcount));
        });
    });
}

async function detectUser(data) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM Users WHERE id = '${data.user}'`;
        pool.query(query, function (err, result, fields) {
            if (err) console.log(err);

            // console.log(result);
            if (result && result.length > 0) {
                console.log("User exists!");
                resolve();
            } else {
                console.log("User does not exist!");
                //Bots welcomes the new user
                bot.postMessage(data.user, 'Hi, I am the Buterfly Bot! I will keep track of your reward points!');
                var sql = `INSERT INTO Users (id, name, starcount, isTeacher) VALUES('${data.user}', 0, 0, 0)`;
                pool.query(sql, function (err, result) {
                    if (err) reject(err)
                    console.log("1 user inserted");
                    resolve();
                });
            }
        });
    })
}

async function detectBadWords(data) {
    // console.log(data.text);
    var star = await getStarCount(data);
    console.log(`Starcount before: ${star}`)
    // console.log(star);
    //console.log(typeof (star));
    var badWordsFound = false;
    let badWords = "SELECT * FROM BadWords";
    pool.query(badWords, async function (err, result, fields) {
        if (err) console.log(err);
        for (i = 0; i < result.length; i++) {
            if (data.text.includes(result[i].word)) {
                star = star - 1;
                badWordsFound = true;
                // console.log("New star");
                // console.log(star);
                var sql = `UPDATE Users SET starcount = '${star}' WHERE id = '${data.user}'`;
                pool.query(sql, function (err, result) {
                    if (err) reject(err);
                })
                console.log('bad word found');
            }
        }
        console.log(`Starcount after: ${await getStarCount(data)}`)
        // console.log(result);
        //}
        if (badWordsFound === false) {
            console.log("no bad words");
            var wordCount = data.text.split(" ");
            if (wordCount.length > 5) {
                var starVal = await getStarCount(data);
                starVal = starVal + 1;
                var sql = `UPDATE Users SET starcount = '${starVal}' WHERE id = '${data.user}'`;
                pool.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Message Greater than 5 words");
                    console.log(starVal);
                    bot.postMessage(data.user, `I have detected that you have responded with a sufficient message. Your current star count is now ${await getStarCount(data)}. Great Work!`);
                })
            }
        }
        else {
            console.log("bad words found after");
            bot.postMessage(data.user, `I have detected that you used innapropriate language. Your current star count is now ${await getStarCount(data)}`);
        }
    });
}

//Message handler
bot.on('message', async function (data) {
    if (data.type !== 'message') {
        return;
    }

    if (data.subtype !== 'bot_message') { // So bot doesn't reply to itself

        console.log(data.user);
        await detectUser(data);
        detectBadWords(data)

    }
    console.log(data);
    // console.log(bot.getUserById(data.user).info);
    handleMessage(data.text);
});


// bot.on('message', async ({ payload, context }) => {

//     try {
//      // Call the users.info method using the built-in WebClient
//      const result = await bot.client.users.info({
//        // The token you used to initialize your app is stored in the `context` object
//        token: context.botToken,
//        // Call users.info for the user that joined the workspace
//        user: payload.user.id
//      });

//      console.log(result);
//    }
//    catch (error) {
//      console.error(error);
//    }
//  });


//respond to data
function handleMessage(message) {
    if (message.includes(' chucknorris')) {
        chuckJoke();
    }
    else if (message.includes(' yomama')) {
        yoMamaJoke();
    }
    else if (message.includes(' random')) {
        randomJoke();
    }
    else if (message.includes(' help')) {
        runHelp();
    }
}

//tell a chuck norris joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random').then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':star:'
        }

        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
    });
}

//tell a yo mama joke
function yoMamaJoke() {
    axios.get('http://api.icndb.com/jokes/random').then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':x:'
        }

        bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
    });
}

//tell a random joke
function randomJoke() {
    const rand = Math.floor(Math.random() * 2 + 1);
    if (rand === 1) {
        chuckJoke();
    }
    else if (rand === 2) {
        yoMamaJoke();
    }
}

//show help text
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel('general', `Type @butterfly with either 'chucknorris', 'yomama', or 'random' to get a joke`, params);

}

