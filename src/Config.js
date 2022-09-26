import { SettingsObject, Setting } from '../SettingsManager/SettingsManager';
import { registerCommand } from './Commands';

let Config = new SettingsObject('CarburettorUtilities', [
    {
        name: 'Main',
        settings: [
            new Setting.Button('Reset Settings', 'Reset', () => {
                Config.reset();
                Config.load();
            }),
        ]
    },
    {
        name: 'Afk Tracker',
        settings: [
            new Setting.Toggle('Enabled', true),
        ]
    }, {
        name: 'Chat Stats',
        settings: [
            new Setting.Toggle('Hypixel lobby chat replace', true),
            new Setting.Toggle('BWP auto-who & chat-stats', true),
            new Setting.TextInput('BWP API Key', 'Enter your BWP API key here'),
        ]
    }, {
        name: 'Keybinds',
        settings: [
            new Setting.Toggle('Y - Incoming player', true),
            new Setting.Toggle('U - Stay back', true),
            new Setting.Toggle('I - Coming back', true),
            new Setting.Toggle('K - /who', true),
        ]
    }, {
        name: 'Misc Chat Checks',
        settings: [
            new Setting.Toggle('Auto GG', true),
            new Setting.Toggle('Auto Who', true),
        ]
    }, {
        name: 'Quick Leave',
        settings: [
            new Setting.Toggle('Enabled', true),
            new Setting.Slider('Min time (seconds)', 1, 0, 3, 0),
            new Setting.Slider('Max time (seconds)', 5, 3, 15, 0),
        ]
    }
]);

Config.setCommand('cu-settings')
    .setSize(500, 180)
    .setColor(0xfff3e300);

Setting.register(Config);

export default Config;

SettingsObject.prototype.get = function (path) {
    return this.getSetting(...path.split('|'));
}

registerCommand('settings', () => {
    Config.open();
});