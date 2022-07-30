let afk = false;
let prevX = Player.getX();
let prevY = Player.getY();

export function initializeTrackers() {
    register("worldLoad", (_) => {
        afk = false;
    });

    const isAFKChecker = TriggerRegister.registerStep(checkIfAfk);
    isAFKChecker.setDelay(120);

    const isNotAFKChecker = TriggerRegister.registerStep(checkIfNotAfk);
    isNotAFKChecker.setDelay(3);
}

//Getter required for non-traditional runtime, doesn't work without it for some reason
export function getAfk() {
    return afk;
}

export function setAfk(newAfk) {
    const prevAfk = afk;

    afk = newAfk;

    if (afk && prevAfk) {
        ChatLib.chat(`&8<<<--- You are AFK --->>>`);
    } else if (afk && !prevAfk) {
        ChatLib.chat(`&8<<<--- You are now AFK --->>>`);
    } else if (!afk && prevAfk) {
        ChatLib.chat(`&a<<<--- You are no longer AFK --->>>`);
    }
}

export function resetLastCoords() {
    prevX = Player.getX();
    prevY = Player.getY();
}

function checkIfAfk() {
    if (afk || prevX === Player.getX() && prevY === Player.getY()) {
        setAfk(true);
    }
    resetLastCoords();
}

function checkIfNotAfk() {
    if (prevX !== Player.getX() && prevY !== Player.getY()) {
        setAfk(false);
    }
}