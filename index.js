const SlackBot = require('slackbots');
const axios = require('axios');

var mysql = require('mysql');

var bot = new SlackBot({
    name: 'butterfly',
    token: ''
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

//Message handler
bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }

    if (data.subtype !== 'bot_message') { // So bot doesn't reply to itself

        console.log(data.user);
        let query = `SELECT * FROM Users WHERE id = '${data.user}'`;
        pool.query(query, function (err, result, fields) {
            if (err) console.log(err);

            // console.log(result);
            if (result && result.length > 0) {
                console.log("User exists!");
            } else {
                console.log("User does not exist!");
                //Bots welcomes the new user
                bot.postMessage(data.user, 'Hi, I am the Buterfly Bot! I will keep track of your reward points!');
                var sql = `INSERT INTO Users (id, name, starcount, isTeacher) VALUES('${data.user}', 0, 0, 0)`;
                pool.query(sql, function (err, result) {
                    if (err) console.log(err);
                    console.log("1 user inserted");
                });
            }
        });
        console.log(data.text);
        let badWords = "SELECT * FROM BadWords";
        pool.query(badWords, function (err, result, fields) {
            if (err) console.log(err);

            console.log(result);

        })
    }
    //     if (message compared with bad words table are equal){
    //         take away a Star, send a message, and send a message to the teacher
    //     }
    //     else if (message is >5 words){
    //         add a star, send a message
    //     }

    // }
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

    //data.user is userID
}


// config.query("SELECT id FROM Users", function (err, result, fields) {
        //     if (err) throw err;

        //     console.log(typeof (result));
        //     console.log(Object.keys(result));
        //     for (let i = 0; i < result.length; i++) {
        //         console.log(typeof (result[i]));
        //         console.log(`result[i]: ${result[i]}`);
        //     }

        //     // results.forEach(function(result){
        //     //     console.logF
        //     // if (data.user !== result[i]) {
        //     //     var sql = `INSERT INTO Users (id, name, starcount, isTeacher) VALUES('${data.user}', 0, 0, 0)`;
        //     //     config.query(sql, function (err, result) {
        //     //     if (err) throw err; 
        //     //     console.log("1 user inserted");
        //     //     });
        //     // }
        //     // };
        // });

        // config.query("SELECT * FROM Users", function(err, result, f) {
        //     if (err) throw err;
        //     console.log(result);