"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = __importDefault(require("../utils/Mail"));
class MailCache extends Map {
    set(id, mail) {
        return super.set(id, new Mail_1.default(mail));
    }
}
exports.default = MailCache;
//# sourceMappingURL=MailCache.js.map