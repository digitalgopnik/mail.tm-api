"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getError_1 = __importDefault(require("../utils/getError"));
const request_1 = __importDefault(require("../utils/request"));
const MailCache_1 = __importDefault(require("./MailCache"));
class Mails {
    cache;
    constructor() {
        Object.defineProperty(this, 'cache', { value: new MailCache_1.default(), configurable: true, writable: false, enumerable: false });
    }
    async fetch(id) {
        return await new Promise(async (resolve, reject) => {
            const response = await (0, request_1.default)().get(`/messages/${id}`).catch(err => err.response);
            if (response.status === 200) {
                this.cache.set(id, response.data);
                resolve(response.data);
                return;
            }
            reject((0, getError_1.default)(response));
        });
    }
    async fetchAll(page = 1) {
        return await new Promise(async (resolve, reject) => {
            const response = await (0, request_1.default)().get(`/messages?page=${page}`).catch(err => err.response);
            console.log(response);
            if (response.status === 200) {
                response.data.forEach((mail) => this.cache.set(mail.id, mail));
                resolve(response.data);
                return;
            }
            reject((0, getError_1.default)(response));
        });
    }
}
exports.default = Mails;
//# sourceMappingURL=Mails.js.map