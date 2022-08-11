// import { showStatsFor } from './BwpChatStats';

export function startMiscChatChecks() {}

register('chat', (message) => {
    checkForAutoWelcomeBack(message);
    // checkForAutoReportInGuildChat(message);
    checkForAutoGG(message);
    // checkForAutoWhoForMMC(message);

    if (message.includes("mefliolover321 was killed by")) {
        setTimeout(() => {
            ChatLib.say("/pc Owie.");
        }, 1000);
    }

    if (message.includes("mefliolover321 fell into the void.")) {
        setTimeout(() => {
            ChatLib.say("/pc Youch.");
        }, 1000);
    }
}).setCriteria('${message}');

function checkForAutoWelcomeBack(message) {
    if (message.includes('Guild > ') && message.includes('joined')) {
        ChatLib.say(`/gc Welcome back, ${message.split(' ')[message.split(' ').length - 2]}`);
    }
}

/*function checkForAutoReportInGuildChat(message) {
    if (message.includes('§2Guild') && ['/report', '/cr', '/wdr'].some(value => message.includes(value))) {
        const report = message.slice(message.lastIndexOf(':') + 1).trim();

        ChatLib.say(report);

        setTimeout(() => {
            ChatLib.say(`/gc Done reporting ${report.split(' ')[1]}!`);
        }, 1000);
    }
}*/

function checkForAutoGG(message) {
    if ([' 1st Killer - ', '% - Bow Accuracy - ', '% - Melee Accuracy - '].some(value => message.includes(value))) {
       setTimeout(() => {
            ChatLib.say(`/ac ${getPhrase()}`);
        }, 2000);
    }

    function getPhrase() {
        return [
            'Good fight! Have a nice day :D! Also, I like cars.', gOoDgAmE(), 'GG!!!!!', '!emaG dooG'
        ][~~(Math.random() * 4)];
    }

    function gOoDgAmE() {
        return '(->> "good game" (seq) (map #(if (< 0.5 (rand)) (str/upper-case %) %)) (apply str))';
    }
}

/*
let prevMessage;
function checkForAutoWhoForMMC(message) {
    if (/ .* Opponent: /.test(message) && / .* Map: /.test(prevMessage)) {
        setTimeout(() => {
            ChatLib.chat(`ONLINE: ${message.split(':')[1].trim()}, ${Player.getName()}`);
        }, 200);
    }
    prevMessage = message;
}*/
