# Carburettor1.8.9Utils
A collection of little utility mods using the ChatTriggers framework

# Table of Contents:

- [Installation](#installation)
- [Configuration](#configuration)
- [Features](#features)
  - [AutoGG](#autogg)
  - [AutoWho](#autowho)
  - [AfkTracker](#afktracker)
  - [BwpChatStats](#bwpchatstats)
  - [HypixelChatStats](#hypixelchatstats)
  - [PartyInviteKick](#partyinvitekick)
  - [QuickLeave](#quickleave)
  - [Keybinds](#keybinds)

# Installation:

### First, download the files. Then, either:
 - Go to `<download-path>\Carburettor1.8.9Utils\scripts`
 - With the command line, run `node copyfiles.js`

### or
 - Copy the `src` folder (the folder itself, not just the contents) into `$APPDATA\.minecraft\config\ChatTriggers\modules`
 - Rename `src` to `CarburettorUtilities`

### Dependencies tree:
 - `SettingsManager`
 - `requestV2`
   - `PromiseV2`

# Configuration
Use `/cu settings`

# Features:

## AutoGG:
After a game*, it says one of any of the customized Auto GG messages you want

**(Bedwars, skywars, duels guaranteed; for other gamemodes, you'll have to see for yourself)*

#### Changing the Auto GG messages:
 - Open MiscChatChecks.js in the source code
 - Find the function `checkForAutoGG`, and locate the nested function `getPhrase` inside
 - Change the phrases in the `phrases` list as you desire; you can add or delete phrases as you wish
   - Format of a phrase: `'<Phrase here>',`
   - Be mindful of the `'`s and `,`
   - Phrases such as `'It's a good day!'` must be phrased as `'It\'s a good day!` so that JS realizes that the `'` is part of the string


## AutoWho:
Says `/who` for you when joining a bedwars game*

**Does `/who` for any game that sends you to a `mini` server, but is made for use with bedwars*


## AfkTracker:
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


## BwpChatStats:
When you join a `bedwarspractice.club` game, it:
 - Stats checks the players with the format:
    - `<<< [✫level] name >>>` if it's you
    - `<-- [✫level] name -->` if it's an opponent
    - *The messages are colored by prestige color
 - Says a message in the `/who` format for use with Cubelify
    - e.g. `ONLINE: carburettor, mefliolover321, gamerboy80, tom`

#### Commands:
 - `/cu bwpstars <player1> <player2?> <player3?> <...>`
    - Does the same as the first stat check
    - Takes multiple players seperated by whitespace, only one player is *required*


## HypixelChatStats:
Currently only has one feature, more probably coming soon

Allows you to click on players' names in bedwars lobbies (or duels or maybe skywars not sure) to add them to Cubelify

![Hypixel lobby chat replace demo](https://github.com/toptobes/Carburettor1.8.9Utils/blob/main/media/hypixellobbychatreplacedemo.gif)


## PartyInviteKick:
I just made this to annoy a certain friend

When used, it invites a person to a party, then immediately kicks and re-invites them `n` times

#### Commands:
 - `/cu pik <name> <num_times>`
 - `/cu pik cancel`


## QuickLeave:
Immedietly leaves the bedwars queue if the game is just about to start

You can set a min/max time to auto-leave with `/cu settings`. Defaults to between 1-5 seconds (exclusive).
 - `Game starts in 1 second`   -> Won't dodge
 - `Game starts in 3 seconds`  -> Dodges
 - `Game starts in 14 seconds` -> Won't dodge

It'll say `<<<--- Left @ time_left seconds! --->>>` to you in chat if you it auto-dodged (Only you will see it)


## Keybinds:
Some text macros I made simply for myself mostly since I don't talk in VC

#### Keybinds:
 - Y - 'Incoming player
 - U - 'Stay back'
 - I - 'Coming back'
 - K - '/who'
