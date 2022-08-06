export function startHypixelChatStats() {}

register('chat', (_, star, name, message, event) => {
    let chatMessage = ChatLib.getChatMessage(event);

    chatMessage = new Message(
        new TextComponent(chatMessage)
            .setClick("run_command", `/w +${name.slice(0, -2)}`)
            .setHoverValue("Does /w +${name} on click, for use w/ Cubelify"),
    );

    ChatLib.chat(chatMessage);
    cancel(event);
}).setCriteria('§${_}[${star}] ${name}: ${message}');