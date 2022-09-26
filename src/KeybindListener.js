import Config from './Config';
import { say } from './Chat';

export function startKeybindListeners() {}

function getKeyBindIfEnabled(key, description) {
    if (!Config.get(`Keybinds|${description}`))
        return null;

    let mcKeyBind = Client.getKeyBindFromKey(key);

    if (!mcKeyBind) {
        mcKeyBind = new KeyBind(description, key);
    }

    return mcKeyBind;
}

(function registerKeybinds() {
    let yKeyBind = getKeyBindIfEnabled(Keyboard.KEY_Y, 'Y - Incoming player');
    let uKeyBind = getKeyBindIfEnabled(Keyboard.KEY_U, 'U - Stay back');
    let iKeyBind = getKeyBindIfEnabled(Keyboard.KEY_I, 'I - Coming back');
    let kKeyBind = getKeyBindIfEnabled(Keyboard.KEY_K, 'K - /who');

    let cycle = 0;
    register('tick', () => {
        if (yKeyBind?.isPressed()) {
            say([
                'Void, player inc',
                'Void, inc',
                'Void, someone inc',
                'Void, incoming'
            ][cycle = ++cycle % 4]);
        }

        if (uKeyBind?.isPressed()) {
            say('Stay back just in case');
        }

        if (iKeyBind?.isPressed()) {
            say('I\'m coming back');
        }

        if (kKeyBind?.isPressed()) {
            say('/who');
        }
    });
})();