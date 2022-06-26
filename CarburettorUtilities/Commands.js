"use strict";

import { AfkTracker } from "./AfkTracker";

export const commands = {
    "//who": (_) => {
        //TODO: Make it work, because I accidentally deleted it
    },

    "//afk?": (_) => {
        if (AfkTracker.afk) {
            ChatLib.chat(`&c<<<--- You are AFK --->>>`);
        } else {
            ChatLib.chat(`&a<<<--- You are not AFK --->>>`);
        }
    },

    "//afk!": (args) => {
        if (args.includes("--f") && !AfkTracker.afk) {
            AfkTracker.setAfk(false);
            ChatLib.chat(`&a<<<--- You aren't AFK --->>>`);
        } else {
            AfkTracker.setAfk(true);
        }
    }
};

commands["//afk"] = (args) => commands["//afk!"](args);