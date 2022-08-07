export function startHypixelChatStats() {}

register('chat', (_, prefixes, name, message, event) => {
    let chatMessage = ChatLib.getChatMessage(event);

    const cms = chatMessage.split('[');
    const rankColor = cms.length === 2 ? '§7' : cms[1].slice(-2);

    name = name.replace(/§./g, '');

    chatMessage = new Message(
        new TextComponent(chatMessage)
            .setClick("run_command", `/w +${name}`)
            .setHoverValue(`§7Does /w +${rankColor + name}§7 on click, for use w/ Cubelify`),
    );

    ChatLib.chat(chatMessage);
    cancel(event);
}).setCriteria('§${_}[${prefixes}] ${name}: ${message}');