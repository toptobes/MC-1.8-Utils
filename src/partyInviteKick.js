let enabled = false;

let name = "";
let numTimes = 0;

let cooldown = false;

export function startPartyInviteKick(_name, _numTimes) {
    if (enabled) return;

    enabled = true;
    numTimes = _numTimes;
    name = _name.toLowerCase();

    ChatLib.say(`/p invite ${name}`);
    ChatLib.chat(`&a<<<--- Party invite kick started --->>>`);
}

export function doPartyInviteKick(message) {
    if (!enabled || cooldown) return;

    if (message.toLowerCase().includes(`${name} joined the party.`)) {
        ChatLib.say(`/p kick ${name}`);
        numTimes--;

        cooldown = true;
        setTimeout(() => {
            ChatLib.say(`/p invite ${name}`);
            cooldown = false;
        }, 500);
    }

    if (!numTimes) {
        resetPartyInviteKick();
        ChatLib.chat(`&a<<<--- Party invite kick stopped --->>>`);
    }
}

export function resetPartyInviteKick() {
    enabled = false;
    cooldown = false;
    numTimes = 0;
}