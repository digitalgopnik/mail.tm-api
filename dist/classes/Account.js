"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventListener_1 = __importDefault(require("./EventListener"));
const getError_1 = __importDefault(require("../utils/getError"));
const node_events_1 = __importDefault(require("node:events"));
const request_1 = __importDefault(require("../utils/request"));
const Mails_1 = __importDefault(require("./Mails"));
const MailTMError_1 = __importDefault(require("../errors/MailTMError"));
class Account extends node_events_1.default {
    mails;
    _eventSource;
    config;
    id;
    address;
    quota;
    used;
    isDisabled;
    isDeleted;
    createdAt;
    updatedAt;
    token;
    password;
    constructor(account, config = {}) {
        super();
        Object.defineProperty(this, 'mails', { value: new Mails_1.default(), configurable: true, writable: false, enumerable: true });
        Object.defineProperty(this, 'config', { value: config, enumerable: false, writable: false, configurable: false });
        Object.assign(this, account);
        if (config.disableListening !== true) {
            (0, EventListener_1.default)(this);
        }
    }
    async fetch() {
        return await new Promise(async (resolve, reject) => {
            if (this.token === null || this.token === undefined) {
                if (this.password === null || this.password === undefined || this.address === null || this.address === undefined) {
                    reject(new MailTMError_1.default('Account email address and password or token required'));
                }
                const tokenResponse = await (0, request_1.default)().post('/token', { address: this.address, password: this.password }).catch(err => err.response);
                if (tokenResponse.status === 200) {
                    this.token = tokenResponse.data.token;
                    (0, request_1.default)().defaults.headers.common.Authorization = `Bearer ${this.token}`;
                }
                else {
                    reject((0, getError_1.default)(tokenResponse));
                    return;
                }
            }
            else {
                (0, request_1.default)().defaults.headers.common.Authorization = `Bearer ${this.token}`;
            }
            const accountResponse = await (0, request_1.default)().get('/me').catch(err => err.response);
            if (accountResponse.status === 200) {
                Object.assign(this, accountResponse.data, { password: this.password, token: this.token });
                resolve(this);
                return;
            }
            reject((0, getError_1.default)(accountResponse));
        });
    }
    async delete() {
        return await new Promise(async (resolve, reject) => {
            const response = await (0, request_1.default)().delete(`/accounts/${this.id}`).catch(err => err.response);
            if (response.status === 204) {
                this._eventSource?.close();
                resolve(true);
                return;
            }
            reject((0, getError_1.default)(response));
        });
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map