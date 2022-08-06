let isAfk = false;
let prevX = Player.getX();
let prevY = Player.getY();

export function startAfkTracker() {}

(function registerAfkCommand() {
    register('command', (...args) => {
        switch (true) {
            case args.includes('?'):
                tellPlayerIfAfkOrNot();
                break;
            case args.includes('false') && isAfk:
                setAfk(false);
                break;
            case args.includes('false') && !isAfk:
                ChatLib.chat(`&a<<<--- You are not AFK --->>>`);
                break;
            case args[0] === undefined:
            case args.includes('true'):
                setAfk(true);
                break;
            default:
                ChatLib.chat('&c<<<--- Invalid args --->>>');
        }
    }).setName('/afk');
}());

(function registerAfkTrackers() {
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
        resetLastCoords();
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
    this.afkResponseIndex = 0;

    register('chat', () => {
        if (isAfk) {
            ChatLib.say(`/r ${getAfkResponse()} (Automated message)`);
        }

        function getAfkResponse() {
            return ['Hey, I\'m prob afk rn', 'I\'m afk rn, sorry!', '\\o, I\'m afk rn', 'Sorry, but I\'m afk rn'][afkResponseIndex++ % 4];
        }
    }).setCriteria('From ${rank_plus_name}: ${message}');
}());

function tellPlayerIfAfkOrNot() {
    if (isAfk) {
        ChatLib.chat('&c<<<--- You are AFK --->>>');
    } else {
        ChatLib.chat('&a<<<--- You are not AFK --->>>');
    }
}

function setAfk(newAfk) {
    const prevAfk = isAfk;
    isAfk = newAfk;

    if (isAfk) {
        resetLastCoords();
    }

    switch (true) {
        case isAfk && prevAfk:
            ChatLib.chat(`&8<<<--- You are AFK --->>>`);
            break;
        case isAfk && !prevAfk:
            ChatLib.chat(`&8<<<--- You are now AFK --->>>`);
            break;
        case !isAfk && prevAfk:
            ChatLib.chat(`&a<<<--- You are no longer AFK --->>>`);
    }
}

function resetLastCoords() {
    prevX = Player.getX();
    prevY = Player.getY();
}
