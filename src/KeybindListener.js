let yKeyBind = getKeyBindFromKey(Keyboard.KEY_Y, 'Y - Incoming player');
let uKeyBind = getKeyBindFromKey(Keyboard.KEY_U, 'U - Stay back');
let kKeyBind = getKeyBindFromKey(Keyboard.KEY_K, 'K - /who');
let lKeyBind = getKeyBindFromKey(Keyboard.KEY_L, 'L - /l (k1)');
let mKeyBind = getKeyBindFromKey(Keyboard.KEY_M, 'M - /l (k2)');

export function startKeybindListeners() {}

function getKeyBindFromKey(key, description) {
    let mcKeyBind = Client.getKeyBindFromKey(key);

    if (!mcKeyBind) {
        mcKeyBind = new KeyBind(description, key);
    }

    return mcKeyBind;
}

let cycle = 0;
register('tick', () => {
    if (yKeyBind.isPressed()) {
        ChatLib.say([
            'Void, player inc',
            'Void, inc',
            'Void, someone inc',
            'Void, incoming'
        ][cycle = ++cycle % 4]);
    }

    if (uKeyBind.isPressed()) {
        ChatLib.say('Stay back just in case');
    }


    if (kKeyBind.isPressed()) {
        ChatLib.say('/who');
    }

    if (lKeyBind.isPressed() && mKeyBind.isPressed()) {
        ChatLib.say('/l');
    }
});