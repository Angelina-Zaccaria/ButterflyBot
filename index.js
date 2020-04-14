const SlackBot = require('slackbots');
const axios = require('axios');

var bot = new SlackBot({
    name: 'butterfly',
    token: process.env.TOKEN
});

// Retrieve api token from environment variable
// bot.token = process.env.TOKEN;

if( !bot.token )
{
    console.log(`There has been an issue w the token`);
	// console.log(chalk`{red.bold TOKEN is not defined!}`);
	// console.log(`Please set your environment variables with appropriate token.`);
	// console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

// console.log(chalk.green(`Your token is: ${bot.token.substring(0,4)}...`));
console.log(`Your token is: ${bot.token.substring(0,4)}...`);

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
    if(data.type !== 'message') {
        return;
    }
    console.log(data);
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
