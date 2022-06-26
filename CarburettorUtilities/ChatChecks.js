"use strict";

import * as AfkTracker from "./AfkTracker";

export function checkForAutoWelcomeBack(message) {
    if (message.includes("Guild > ") && message.includes("joined")) {
        ChatLib.say(`/gc Welcome back, ${message.split(" ")[message.split(" ").length - 2]}`);
    }
}

export function checkForAutoReportInGuildChat(message) {
    if (message.includes("§2Guild") && ["/report", "/cr", "/wdr"].some(value => message.includes(value))) {
        const report = message.slice(message.lastIndexOf(":") + 1).trim();

        ChatLib.say(report);

        setTimeout(() => {
            ChatLib.say(`/gc Done reporting ${report.split(" ")[1]}!`);
        }, 1000);
    }
}

export function checkForAutoGG(message) {
    if ([" 1st Killer - ", "% - Bow Accuracy - ", "% - Melee Accuracy - "].some(value => message.includes(value))) {
        setTimeout(() => {
            ChatLib.say(`/ac ${getPhrase()}`);
        }, 2000);
    }

    function getPhrase() {
        return [
            "Good fight! Have a nice day :D! Also, I like cars.", gOoDgAmE(), "GG!1!!!!1!!!1!!!", "!emaG dooG"
        ][~~(Math.random() * 4)];
    }

    function gOoDgAmE() {
        return '[..."good game"].map(c => (Math.random() < .5) ? c.toUpperCase() : c).join("")';
    }
}

export function checkForAutoWhoForBedwarsPracticeDotClub(message) {
    if (message.includes("Players in this game:")) {
        setTimeout(() => {
            ChatLib.chat(`ONLINE: ${message.trim().split(" ").slice(4).join(", ")}`);
        }, 200);
    }
}


let prevMessage;
export function checkForAutoWhoForMMC(message) {
    if (/ .* Opponent: /.test(message) && / .* Map: /.test(prevMessage)) {
        setTimeout(() => {
            ChatLib.chat(`ONLINE: ${message.split(":")[1].trim()}, ${Player.getName()}`);
        }, 200);
    }
    prevMessage = message;
}

let afkResponseIndex = 0;
export function checkForDmWhileAfk(message) {
    if (AfkTracker.afk && /^(?=From.*:)/.test(message)) {
        ChatLib.say(`/r ${getAfkResponse()} (Automated message)`);
    }

    function getAfkResponse() {
        return ["Hey, I'm prob afk rn", "I'm afk rn, sorry!", "\\o, I'm afk rn", "Sorry, but I'm afk rn"][afkResponseIndex++];
    }
}

export function checkForSentToLimbo(message) {
    if (message.includes("You are AFK. Move around to return from AFK.")) {
        AfkTracker.setAfk(true)
    }
}
