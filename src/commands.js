import { getAfk, resetLastCoords, setAfk } from "./afkTracker";
import { showStatsFor } from "./bwpChatStats";
import { resetPartyInviteKick, startPartyInviteKick } from "./partyInviteKick";

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
            resetLastCoords();
            setAfk(true);
        }
    },

    "//bwpstars": (args) => {
        showStatsFor(args);
    },

    "//pik": (args) => {
        if (args.includes("--c")) {
            resetPartyInviteKick();
        } else if (args.length === 2) {
            startPartyInviteKick(args[0], args[1]);
        }
    }
};

commands["//afk"] = (args) => commands["//afk!"](args);
commands["//bs"] = (args) => commands["//stars"](args);