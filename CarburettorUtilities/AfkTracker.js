"use strict";

let afk = false;
let prevX = Player.getX();
let prevY = Player.getY();

export function initializeTrackers() {
    register("worldLoad", (_) => {
        afk = false;
    });

    const isAFKChecker = TriggerRegister.registerStep(checkIfAfk);
    isAFKChecker.setDelay(10);

    const isNotAFKChecker = TriggerRegister.registerStep(checkIfNotAfk);
    isNotAFKChecker.setDelay(3);
}

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

function checkIfAfk() {
    if (afk || prevX === Player.getX() && prevY === Player.getY()) {
        setAfk(true);
    }
    prevX = Player.getX();
    prevY = Player.getY();
}

function checkIfNotAfk() {
    if (prevX !== Player.getX() && prevY !== Player.getY()) {
        setAfk(false);
    }
}