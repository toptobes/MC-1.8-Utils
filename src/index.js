// Basically the second thing I've written in JS. Spare me!
// Some JS is unconventional due to the Rhino engine's quirks.

import { startAfkTracker } from './AfkTracker';
import { startKeybindListeners } from './KeybindListener';
import { startPartyInviteKickCommand } from './PartyInviteKick';
import { startBwpChatStats } from './BwpChatStats';
import { startMiscChatChecks } from './MiscChatChecks';
import { startHypixelChatStats } from './HypixelChatStats';
import { StartQuickLeave } from './QuickLeave';

ChatLib.chat('Hello, world!');
