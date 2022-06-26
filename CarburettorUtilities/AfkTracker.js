"use strict";

export const AfkTracker = {
    afk: false,
    prevX: Player.getX(),
    prevY: Player.getY(),

    setAfk: function(afk) {
        const prevAfk = this.afk;

        this.afk = afk;
        this.prevX = Player.getX();
        this.prevY = Player.getY();

        if (this.afk && prevAfk) {
            ChatLib.chat(`&8<<<--- You are AFK --->>>`);
        } else if (this.afk && !prevAfk) {
            ChatLib.chat(`&8<<<--- You are now AFK --->>>`);
        } else if (!this.afk && prevAfk) {
            ChatLib.chat(`&a<<<--- You are no longer AFK --->>>`);
        }
    },

    checkIfAfk: function() {
        if (this.afk || this.prevX === Player.getX() && this.prevY === Player.getY()) {
            this.setAfk(true);
        }
    },

    checkIfNotAfk: function() {
        if (this.prevX !== Player.getX() && this.prevY !== Player.getY()) {
            this.afk = false;
        }
    }
};

register("worldLoad", (_) => {
    AfkTracker.afk = false;
});

const isAFKChecker = TriggerRegister.registerStep(AfkTracker.checkIfAfk);
isAFKChecker.setDelay(10);

const isNotAFKChecker = TriggerRegister.registerStep(AfkTracker.checkIfNotAfk);
isNotAFKChecker.setDelay(3);