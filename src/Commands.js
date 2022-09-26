import { chatf, RED } from './Chat';

let commandNames = {};

export function registerCommand(name, callback) {
    commandNames[name] = callback;
}

register('command', (...[commandName, ...args]) => {
    if (commandNames[commandName]) {
        commandNames[commandName](...args);
    } else {
        chatf(RED, '<<<--- Unknown command --->>>');
    }
}).setName('cu');
