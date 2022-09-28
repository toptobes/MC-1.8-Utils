import { registerCommand } from './Commands';
import { chatf, DARK_GRAY, GREEN, RED, say } from './Chat';
import Config from './Config';

let isAfk = false;
let prevX = Player.getX();
let prevY = Player.getY();

export function startAfkTracker() {}

(function registerAfkCommand() {
    if (!Config.get('Afk Tracker|Enabled'))
        return;

    registerCommand('afk', (args) => {
        switch (true) {
            case args.includes('?'):
                tellPlayerIfAfkOrNot();
                break;

            case args.includes('false') && isAfk:
                setAfk(false);
                break;

            case args.includes('false') && !isAfk:
                chatf(RED, '<<<--- You are not AFK --->>>');
                break;

            case args[0] === undefined:
            case args.includes('true'):
                setAfk(true);
                break;

            default:
                chatf(RED, '<<<--- Invalid args --->>>');
                break;
        }
    });
}());

(function registerAfkTrackers() {
    if (!Config.get('Afk Tracker|Enabled'))
        return;

    this.disabled = false;

    register('worldLoad', (_) => {
        this.disabled = true;

        setTimeout(() => {
            this.disabled = false;
        }, 3000);
    });

    register('step', () => {
        if (this.disabled) return;

        if (isAfk || prevX === Player.getX() && prevY === Player.getY()) {
            setAfk(true);
        }
        updateLastCoords();
    }).setDelay(150);

    register('step', () => {
        if (prevX !== Player.getX() && prevY !== Player.getY()) {
            setAfk(false);
        }
    }).setDelay(3);

    register('chat', () => {
        setAfk(true);
    }).setCriteria('You are AFK. Move around to return from AFK.');
}());

(function registerPlayerResponderForWhenAfk() {
    if (!Config.get('Afk Tracker|Enabled'))
        return;

    let afkResponseIndex = 0;

    register('chat', () => {
        if (isAfk) {
            say(`/r ${getAfkResponse()} (Automated message)`)
        }

        function getAfkResponse() {
            return ['Hey, I\'m prob afk rn', 'I\'m afk rn, sorry!', '\\o, I\'m afk rn', 'Sorry, but I\'m afk rn'][afkResponseIndex++ % 4];
        }
    }).setCriteria('From ${rank_plus_name}: ${message}');
}());

function tellPlayerIfAfkOrNot() {
    if (isAfk) {
        chatf(RED, '<<<--- You are AFK --->>>');
    } else {
        chatf(GREEN, '<<<--- You are not AFK --->>>');
    }
}

function setAfk(newAfk) {
    const prevAfk = isAfk;
    isAfk = newAfk;

    if (isAfk) {
        updateLastCoords();
    }

    switch (true) {
        case isAfk && prevAfk:
            chatf(DARK_GRAY, '<<<--- You are AFK --->>>');
            break;
        case isAfk && !prevAfk:
            chatf(DARK_GRAY, '<<<--- You are now AFK --->>>');
            break;
        case !isAfk && prevAfk:
            chatf(GREEN, '<<<--- You are no longer AFK --->>>');
            break;
    }
}

function updateLastCoords() {
    prevX = Player.getX();
    prevY = Player.getY();
}

/*
# Carburettor1.8.9Utils
A collection of little utility mods using the ChatTriggers framework

## Features:


### AutoGG
After a game*, it says one of any of the customized Auto GG messages you want

**(Bedwars, skywars, duels guaranteed; for other gamemodes, you'll have to see for yourself)*

#### Changing the Auto GG messages:
 - Open MiscChatChecks.js in the source code
 - Find the function `checkForAutoGG`, and locate the nested function `getPhrase` inside
 - Change the phrases in the `phrases` list as you desire; you can add or delete phrases as you wish
   - Format of a phrase: `'<Phrase here>',`
   - Be mindful of the `'`s and `,`
   - Phrases such as `'It's a good day!'` must be phrased as `'It\'s a good day!` so that JS realizes that the `'` is part of the string


### AutoWho
Says `/who` for you when joining a bedwars game*

**Does `/who` for any game that sends you to a `mini` server, but is made for use with bedwars*


### AfkTracker
Tracks when you go afk, and responds to people that dm you when you're afk

(It responds with messages such as 'I'm afk rn, sorry!')

You can change the messages in `AfkTracker.js`

#### Commands:
 - `/cu afk ?`
    - Tells you whether or not you're afk
 - `/cu afk <true | false>`
    - Sets you as afk/unafk
 - `/cu afk`
    - Sets you as afk


### BwpChatStats
When you join a `bedwarspractice.club` game, it:
 - Stats checks the players with the format:
    - `<<< [✫level] name >>>` if it's you
    - `<-- [✫level] name -->` if it's an opponent
    - *The messages are colored by prestige color
 - Says a message in the `/who` format for use with Cubelify
    - e.g. `ONLINE: carburettor, mefliolover321, gamerboy80, tom`

#### Commands:
 - `/cu bwpstars player1 <player2> <player3>`
    - Does the same as the first stat check
    - Takes multiple players seperated by whitespace, only one player is *required*
 */