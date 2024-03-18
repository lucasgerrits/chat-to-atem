"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.Util = Util;
