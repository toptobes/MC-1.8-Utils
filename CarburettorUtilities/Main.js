"use strict";

import request from "../requestV2";
import { commands } from "./Commands";
import * as Checks from "./ChatChecks"
import * as AfkTracker from "./AfkTracker";

//Basically the second thing I've written in JS. Spare me!

ChatLib.chat("Hello, world!")

/*
request({
    url: "https://api.voxyl.net/player/stats/overall/e21d44c5-c1fd-4119-b55c-5baced12fd6e?api=HhtTKOr5nIvl8adDZMtaLAjsBhClrmvp",
    json: true
}).then(function(response) {
    ChatLib.chat(response);
});
*/

AfkTracker.initializeTrackers()

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
