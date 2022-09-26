let commandNames = {};

export function registerCommand(name, callback) {
    commandNames[name] = callback;
}

register('command', (...[commandName, ...args]) => {
    commandNames[commandName]?.(args);
}).setName('cu');
