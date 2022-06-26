"use strict";

export let afk = false;
export let prevX = Player.getX();
export let prevY = Player.getY();

export function initializeTrackers() {
    register("worldLoad", (_) => {
        afk = false;
    });

    const isAFKChecker = TriggerRegister.registerStep(checkIfAfk);
    isAFKChecker.setDelay(180);

    const isNotAFKChecker = TriggerRegister.registerStep(checkIfNotAfk);
    isNotAFKChecker.setDelay(3);
}

export function setAfk(newAfk) {
    const prevAfk = afk;

    afk = newAfk;
    prevX = Player.getX();
    prevY = Player.getY();

    if (afk && prevAfk) {
        ChatLib.chat(`&8<<<--- You are AFK --->>>`);
    } else if (afk && !prevAfk) {
        ChatLib.chat(`&8<<<--- You are now AFK --->>>`);
    } else if (!afk && prevAfk) {
        ChatLib.chat(`&a<<<--- You are no longer AFK --->>>`);
    }
}

export function checkIfAfk() {
    if (afk || prevX === Player.getX() && prevY === Player.getY()) {
        setAfk(true);
    }
}

export function checkIfNotAfk(afk) {
    if (prevX !== Player.getX() && prevY !== Player.getY()) {
        setAfk(false);
    }
}