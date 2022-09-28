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


### HypixelChatStats
