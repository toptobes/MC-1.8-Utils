let name = "";
let enabled = false;
let numTimes = 0;

export function startPartyInviteKick(_name, _numTimes) {
    if (enabled) return;

    enabled = true;
    numTimes = _numTimes;
    name = _name.toLowerCase();

    ChatLib.say(`/p invite ${name}`);
    ChatLib.chat(`&a<<<--- Party invite kick started --->>>`);
}

export function doPartyInviteKick(message) {
    if (!enabled) return;

    message = message.toLowerCase();

    if (message.includes(`${name} joined the party.`)) {
        ChatLib.say(`/p kick ${name}`);
        numTimes--;

        setTimeout(() => {
            ChatLib.say(`/p invite ${name}`);
        }, 500);
    }

    const pInviteExpired = message.includes("the party invite to ") && message.includes(" has expired") && message.includes(` ${name} `);
    const playerLeft = message.includes("you cannot invite that player since they're not online.");
    const playerDoesntExist = message.includes("couldn't find a player with that name!");

    if (!numTimes || numTimes && (pInviteExpired || playerLeft || playerDoesntExist)) {
        resetPartyInviteKick();
    }
}

export function resetPartyInviteKick() {
    enabled = false;
    numTimes = 0;
    setTimeout(() => {
        ChatLib.chat(`&c<<<--- Party invite kick stopped --->>>`);
    }, 200);
}