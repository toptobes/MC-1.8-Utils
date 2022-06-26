"use strict";

import { commands } from "./Commands";
import { AfkTracker } from "./AfkTracker";
import * as Checks from "./ChatChecks"

//Basically the second thing I've written in JS, coming from the time I was still a (noob-y) Java main. Spare me!

ChatLib.chat("Hello, world!")

register("messageSent", (message, event) => {
    const command = message.split(" ")[0];
    const args = message.split(" ").slice(1);

    if (!commands.hasOwnProperty(command) || args.includes("--i")) {
        return;
    }

    commands[command](args);

    event.cancelled = true;
});

register("chat", message => {
    Checks.checkForAutoWelcomeBack(message);
    Checks.checkForAutoReportInGuildChat(message);
    Checks.checkForAutoGG(message);
    Checks.checkForAutoWhoForBedwarsPracticeDotClub(message);
    Checks.checkForAutoWhoForMMC(message);
    Checks.checkForDmWhileAfk(message);
    Checks.checkForSentToLimbo(message);
}).setCriteria("${message}");
