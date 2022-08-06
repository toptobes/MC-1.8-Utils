import request from '../requestV2';
import { colors, prestiges } from './Prestiges';
import Config from './Config';

export function startBwpChatStats() {}

register('command', (...args) => {
    showStatsFor(args.join(', '));
}).setName("/bwpstars");

register('chat', (message) => {
    checkForDisplayingBWPStats(message);
    checkForAutoWhoForBedwarsPracticeDotClub(message);
}).setCriteria('Players in this game: ${message}');

function checkForDisplayingBWPStats(message) {
    setTimeout(() => {
        showStatsFor(message.trim().split(' '));
    }, 500);
}

function checkForAutoWhoForBedwarsPracticeDotClub(message) {
    setTimeout(() => {
        ChatLib.chat(`ONLINE: ${message.trim().split(' ').join(', ')}`);
    }, 200);
}

function showStatsFor(players) {
    players.filter(unique).forEach((name) => {
        callMojangApi(name);
    });
}

const defaultRequest = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (ChatTriggers)'
    },
    json: true,
    connectionTimeout: 1000,
    readTimeout: 1000
};

function callMojangApi(name) {
    request({ ...{ url: mojangUrl(name) }, ...defaultRequest })
        .then(function(response) {
            callBwpApi(name, response.id);
        })
        .catch(function(response) {
            ChatLib.chat(`Error for ${name}: ${JSON.stringify(response)}`);
        });
}

function callBwpApi(name, uuid) {
    request({ ...{ url: bwpUrl(uuid) }, ...defaultRequest })
        .then(function(response) {
            showStats(name, response);
        })
        .catch(function(response) {
            ChatLib.chat(`Error for ${name}: ${JSON.stringify(response)}`);
        });
}

function showStats(name, response) {
    const colorCode = '&' + colors[prestiges[~~(response.level / 100)].color];

    if (name.localeCompare(Player.getName()) === 0) {
        ChatLib.chat(`${colorCode}<<< [✫${response.level}] ${name} >>>`);
    } else {
        ChatLib.chat(`${colorCode}<-- [✫${response.level}] ${name} -->`);
    }
}

function mojangUrl(name) {
    return `https://api.mojang.com/users/profiles/minecraft/${name}`;
}

function bwpUrl(uuid) {
    return `https://api.voxyl.net/player/stats/overall/${untrimUuid(uuid)}?api=${Config.getSetting('Keys', 'Bwp Api Key')}`;
}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

function untrimUuid(uuid) {
    return uuid.slice(0, 8) + '-' + uuid.slice(8, 12) + '-' + uuid.slice(12, 16) + '-' + uuid.slice(16, 20) + '-' + uuid.slice(20);
}


















