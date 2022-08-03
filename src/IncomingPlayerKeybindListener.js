let yKeyBind = getKeyBindFromKey(Keyboard.KEY_Y, 'Y - Incoming player');

export function startIncomingPlayerKeybindListener() {}

function getKeyBindFromKey(key, description) {
    let mcKeyBind = Client.getKeyBindFromKey(key);

    if (mcKeyBind == null || mcKeyBind == undefined) {
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
        ][cycle++ % 4]);
    }
});