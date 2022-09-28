import Config from './Config';
import { say } from './Chat';

export function startMiscChatChecks() {}

register('chat', (message) => {
    if (Config.get('Misc Chat Checks|Auto GG'))
        checkForAutoGG(message);

    if (Config.get('Misc Chat Checks|Auto Who'))
        checkForAutoWho(message);
}).setCriteria('${message}');

function checkForAutoWho(message) {
    let isAutoWhoTime = message.includes('Sending you to mini') && message.endsWith('!');

    if (isAutoWhoTime)
        setTimeout(() => {
            say('/who');
        }, 300);
}

function checkForAutoGG(message) {
    let isAutoGGTime = [' 1st Killer - ', '% - Bow Accuracy - ', '% - Melee Accuracy - ']
        .some(value => message.includes(value));

    if (isAutoGGTime)
        setTimeout(() => {
            say(`/ac ${getPhrase()}`);
        }, 2000);

    function getPhrase() {
        const phrases = [
            'Good fight! Have a nice day :D! Also, I like cars.',
            '(->> "good game" (seq) (map #(if (< 0.5 (rand)) (str/upper-case %) %)) (apply str))',
            'GG!!!!!',
            '!emaG dooG',
        ]
        return phrases[[~~(Math.random() * phrases.length)]];
    }
}
