import { getAfk, setAfk } from "./AfkTracker";

export const commands = {
    "//who": (_) => {
        //TODO: Make it work, because I accidentally deleted it
    },

    "//afk?": (_) => {
        if (getAfk()) {
            ChatLib.chat("&c<<<--- You are AFK --->>>");
        } else {
            ChatLib.chat("&a<<<--- You are not AFK --->>>");
        }
    },

    "//afk!": (args) => {
        if (args.includes("--f") && getAfk()) {
            setAfk(false);
        } else if (args.includes("--f") && !getAfk()) {
            ChatLib.chat(`&a<<<--- You are not AFK --->>>`);
        } else {
            setAfk(true);
        }
    }
};

commands["//afk"] = (args) => commands["//afk!"](args);