"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MailTMError_1 = __importDefault(require("../errors/MailTMError"));
function getError(response) {
    if (response.data !== null) {
        return response.data.detail !== null && response.data.detail !== undefined ? new MailTMError_1.default(response.data.detail) : response.data.message !== null && response.data.message !== undefined ? new MailTMError_1.default(response.data.message) : response;
    }
    else {
        return new MailTMError_1.default(`Request failed with status ${response.status}`);
    }
}
exports.default = getError;
//# sourceMappingURL=getError.js.map