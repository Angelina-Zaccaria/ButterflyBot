const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: '',
    name: 'butterfly'
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':cat:'
    }

    bot.postMessageToChannel('general', 'Yay I work!', params);
});

//Error handler
bot.on('error', (err) => console.log(err));

//Message handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
});

//respond to data
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();
    }
    else if(message.includes(' yomama')) {
        yoMamaJoke();
    }
    else if(message.includes(' random')) {
        randomJoke();
    }
    else if(message.includes(' help')) {
        runHelp();
    }
}

//tell a chuck norris joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random').then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
    });
}

//tell a yo mama joke
function yoMamaJoke() {
    axios.get('http://api.yomomma.info').then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
    });
}

//tell a random joke
function randomJoke() {
    const rand = Math.floor(Math.random() * 2 + 1);
    if(rand === 1) {
        chuckJoke();
    }
    else if(rand === 2) {
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




// var config = {};
// // Retrieve our api token from the environment variables.
// config.token = process.env.GITHUBTOKEN;

// if( !config.token )
// {
// 	console.log(chalk`{red.bold GITHUBTOKEN is not defined!}`);
// 	console.log(`Please set your environment variables with appropriate token.`);
// 	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
// 	process.exit(1);
// }

// console.log(chalk.green(`Your token is: ${config.token.substring(0,4)}...`));