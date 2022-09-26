// noinspection FallThroughInSwitchStatementJS

import { registerCommand } from './Commands';
import { chatf, GREEN, RED, say } from './Chat';

let name = '';
let enabled = false;
let numTimes = 0;

export function startPartyInviteKickCommand() {}

(function registerPartyInviteKickCommand() {
    registerCommand('pik', (args) => {
        switch (true) {
            case args.includes('cancel'):
                cancelPartyInviteKick();
                break;
            case args.length === 2:
                startPartyInviteKick(args[0], args[1]);
                break;
            default:
                chatf(RED, '<<<--- Invalid args --->>>')
        }
    });
})();

(function partyInviteKick() {
    register('chat', (message) => {
        if (!enabled) return;

        message = message.toLowerCase();

        if (message.includes(`${name} joined the party.`)) {
            say(`/p kick ${name}`);
            numTimes--;

            setTimeout(() => {
                say(`/p invite ${name}`);
            }, 500);
        }

        const pInviteExpired = message.includes('the party invite to ') && message.includes(` ${name} `) && message.includes(' has expired');
        const playerLeft = message.includes('you cannot invite that player since they\'re not online.');
        const playerDoesntExist = message.includes('couldn\'t find a player with that name!');

        if (!numTimes || numTimes && (pInviteExpired || playerLeft || playerDoesntExist)) {
            cancelPartyInviteKick();
        }
    }).setCriteria('${message}');
})();

function startPartyInviteKick(_name, _numTimes) {
    if (enabled) return;

    enabled = true;
    numTimes = _numTimes;
    name = _name.toLowerCase();

    say(`/p invite ${name}`);
    chatf(GREEN, `<<<--- Party invite kick started --->>>`)
}

function cancelPartyInviteKick() {
    enabled = false;
    numTimes = 0;
    setTimeout(() => {
        chatf(RED, `<<<--- Party invite kick stopped --->>>`)
    }, 200);
}