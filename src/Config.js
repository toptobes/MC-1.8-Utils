import { SettingsObject, Setting } from '../SettingsManager/SettingsManager';

let Config = new SettingsObject('CarburettorUtilities', [
    {
        name: 'Keys',
        settings: [
            new Setting.TextInput('BWP API Key', 'Enter your BWP API key here')
        ]
    }, {
        name: 'Afk Tracker',
        settings: [
            new Setting.Toggle('Enabled', true),
            new Setting.Slider('Check if AFK interval', 120, 10, 300, 0),
            new Setting.Slider('Check if not AFK interval', 3, 1, 10, 0),
            new Setting.Toggle('Reply to DMs w/ AFK message', true)
        ]
    }
]);

Config.setCommand('cu')
    .setSize(250, 90)
    .setColor(0xffd1d934);

Setting.register(Config);

export default Config;