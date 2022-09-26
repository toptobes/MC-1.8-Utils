import Config from './Config';
import { chatf, GREEN, say } from './Chat';

export function StartQuickLeave() {}

(function registerQuickLeaveCommand() {
    if (!Config.get('Quick Leave|Enabled'))
        return;

    register('worldLoad', () => {
        setTimeout(() => {
            let title = Scoreboard.getTitle().split('').filter(c => c === c.toUpperCase()).join('');

            let justJoinedBedwarsLobby = title.includes('BED') ||
                                         title.includes(' WAR') ||
                                         title.includes('ED W')

            if (!justJoinedBedwarsLobby) return;

            let line = Scoreboard.getLineByIndex(5).getName();

            if (line.includes('Starting in')) {
                let timeLeft = parseInt(line.slice(14), 10);

                let min = Config.get('Quick Leave|Min time (seconds)');
                let max = Config.get('Quick Leave|Max time (seconds)');

                if (timeLeft > min && timeLeft < max) {
                    say('/l');
                    chatf(GREEN, `<<<--- Left @ ${timeLeft} seconds! --->>>`);
                }
            }
        }, 100);
    });
})();
