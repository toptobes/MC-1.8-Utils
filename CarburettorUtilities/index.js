import { commands } from "./Commands";
import * as Checks from "./ChatChecks"
import * as AfkTracker from "./AfkTracker";

//Basically the second thing I've written in JS. Spare me!

ChatLib.chat("Hello, world!")

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
    Checks.checkForDisplayingBWPStats(message);
}).setCriteria("${message}");
