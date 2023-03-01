"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: 'https://api.mail.tm',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Connection: 'close',
        'User-Agent': 'MailTM API - NodeJS'
    }
});
function request(service) {
    if (service !== null && service !== undefined) {
        instance.defaults.baseURL = `https://api.${service}`;
    }
    return instance;
}
exports.default = request;
;
//# sourceMappingURL=request.js.map