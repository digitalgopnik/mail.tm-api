"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MailTMError_1 = __importDefault(require("../errors/MailTMError"));
const getError_1 = __importDefault(require("./getError"));
const request_1 = __importDefault(require("./request"));
const node_fs_1 = __importDefault(require("node:fs"));
class Mail {
    id;
    accountId;
    msgid;
    from;
    to;
    subject;
    intro;
    seen;
    isDeleted;
    hasAttachments;
    downloadUrl;
    size;
    createdAt;
    updatedAt;
    constructor(mail) {
        Object.assign(this, mail);
    }
    async fetch() {
        return await new Promise(async (resolve, reject) => {
            if (this.isDeleted) {
                reject(new MailTMError_1.default('Mail is deleted'));
                return;
            }
            const response = await (0, request_1.default)().get(`/messages/${this.id}`).catch(err => err.response);
            if (response.status === 200) {
                Object.assign(this, response.data);
            }
            else {
                reject((0, getError_1.default)(response));
                return;
            }
            resolve(this);
        });
    }
    async delete() {
        return await new Promise(async (resolve, reject) => {
            if (this.isDeleted) {
                reject(new MailTMError_1.default('Mail is already deleted'));
                return;
            }
            const response = await (0, request_1.default)().delete(`/messages/${this.id}`).catch(err => err.response);
            if (response.status === 204) {
                Object.defineProperty(this, 'isDeleted', { value: true });
            }
            else {
                reject((0, getError_1.default)(response));
                return;
            }
            resolve(this);
        });
    }
    async setIsSeen(seen = true) {
        return await new Promise(async (resolve, reject) => {
            const response = await (0, request_1.default)().patch(`/messages/${this.id}`, { seen }).catch(err => err.response);
            if (response.status === 200) {
                Object.assign(this, response.data);
            }
            else {
                reject((0, getError_1.default)(response));
                return;
            }
            resolve(this);
        });
    }
    async download(path) {
        return await new Promise(async (resolve, reject) => {
            if (path === null || path === undefined) {
                path = `${this.id}.eml`;
            }
            if (typeof this.downloadUrl !== 'string') {
                reject(new MailTMError_1.default('Download url not available!'));
                return;
            }
            const response = await (0, request_1.default)().get(this.downloadUrl, { headers: { Accept: 'text/html' } }).catch(e => e.response);
            if (typeof response.data !== 'string') {
                reject((0, getError_1.default)(response));
                return;
            }
            node_fs_1.default.writeFileSync(path, response.data, 'utf-8');
            resolve(path);
        });
    }
}
exports.default = Mail;
//# sourceMappingURL=Mail.js.map