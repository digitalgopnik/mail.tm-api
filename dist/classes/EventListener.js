"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventsource_1 = __importDefault(require("eventsource"));
function default_1(Account) {
    Object.defineProperty(Account, '_eventSource', { value: new eventsource_1.default(`https://mercure.${Account.config.mailService ?? 'mail.tm'}/.well-known/mercure?topic=/accounts/${Account.id}`, { headers: { Authorization: `Bearer ${Account.token}`, Accept: 'application/json' } }), configurable: true, writable: true, enumerable: false });
    Account._eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        const jsonData = Object.keys(data)
            .filter(key => !['@context', '@id', '@type'].includes(key))
            .reduce((acc, cur) => ({ ...acc, [cur]: data[cur] }), {});
        switch (data['@type']) {
            case 'Account':
                Object.assign(Account, jsonData);
                break;
            case 'Message':
                Account.mails.cache.set(jsonData.id, jsonData);
                Account.emit('newMail', jsonData);
                break;
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=EventListener.js.map