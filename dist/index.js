"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.loginAccount = exports.createAccount = exports.fetchDomains = exports.Account = void 0;
const MailTMError_1 = __importDefault(require("./errors/MailTMError"));
const getError_1 = __importDefault(require("./utils/getError"));
const Account_1 = __importDefault(require("./classes/Account"));
exports.Account = Account_1.default;
const request_1 = __importDefault(require("./utils/request"));
const CONFIG = {
    disableListening: false,
    mailService: 'mail.tm'
};
let domains = [];
async function fetchDomains({ page = 1, getRandomDomain = false } = {}) {
    return await new Promise(async (resolve, reject) => {
        const response = await (0, request_1.default)().get(`/domains?page=${page}`).catch(err => err.response);
        if (response.status === 200) {
            domains = response.data;
            if (getRandomDomain === true) {
                resolve(domains[Math.floor(Math.random() * domains.length)]);
            }
            else {
                resolve(domains);
            }
        }
        else {
            reject((0, getError_1.default)(response));
        }
    });
}
exports.fetchDomains = fetchDomains;
async function createAccount(address, password) {
    return await new Promise(async (resolve, reject) => {
        await fetchDomains().catch(reject);
        if (typeof address !== 'string') {
            address = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}@${domains[Math.floor(Math.random() * domains.length)].domain}`;
        }
        if (address.split('@').length === 1) {
            if (domains.some(domain => domain.domain === address)) {
                address = `${(Math.random().toString(36).slice(0, 16) + Math.random().toString(36).slice(0, 6)).replace(/\W/, '')}@${address}`;
            }
            else {
                address += `@${domains[Math.floor(Math.random() * domains.length)].domain}`;
            }
        }
        if (typeof password !== 'string') {
            password = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        }
        const response = await (0, request_1.default)().post('/accounts', { address, password }).catch(err => err.response);
        if (response.status === 201) {
            const account = new Account_1.default(Object.assign(response.data, { password }), CONFIG);
            await account.fetch().catch(reject);
            await account.mails.fetchAll().catch(reject);
            resolve(account);
            return;
        }
        reject((0, getError_1.default)(response));
    });
}
exports.createAccount = createAccount;
async function loginAccount(addressOrToken, password) {
    return await new Promise(async (resolve, reject) => {
        await fetchDomains().catch(reject);
        if (typeof addressOrToken !== 'string') {
            throw new MailTMError_1.default('Token or credentials are required');
        }
        if (typeof password === 'string') {
            const tokenResponse = await (0, request_1.default)().post('/token', { address: addressOrToken, password }).catch(err => err.response);
            if (tokenResponse.status !== 200 || typeof tokenResponse.data.token !== 'string' || tokenResponse.data.token === '') {
                reject((0, getError_1.default)(tokenResponse));
                return;
            }
            const response = await (0, request_1.default)().get('/me', { headers: { Authorization: `Bearer ${tokenResponse.data.token}` } }).catch(err => err.response);
            if (response.status === 200) {
                const account = new Account_1.default(Object.assign(response.data, { token: tokenResponse.data.token, password }), CONFIG);
                await account.fetch().catch(reject);
                await account.mails.fetchAll().catch(reject);
                resolve(account);
                return;
            }
            reject((0, getError_1.default)(response));
        }
        else {
            const response = await (0, request_1.default)().get('/me', { headers: { Authorization: `Bearer ${addressOrToken}` } }).catch(err => err.response);
            if (response.status === 200) {
                const account = new Account_1.default(Object.assign(response.data, { token: addressOrToken }), CONFIG);
                await account.fetch().catch(reject);
                await account.mails.fetchAll().catch(reject);
                resolve(account);
                return;
            }
            reject((0, getError_1.default)(response));
        }
    });
}
exports.loginAccount = loginAccount;
function setConfig(config) {
    (0, request_1.default)(config.mailService);
    Object.assign(CONFIG, config);
}
exports.setConfig = setConfig;
//# sourceMappingURL=index.js.map