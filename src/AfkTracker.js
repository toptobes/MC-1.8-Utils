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

(function registerPlayerResponderWhenAfk() {
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
