"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_types_1 = require("../types/main.types");
function autoResponser(res, objToCheck, type) {
    if (!(0, main_types_1.isOfType)(objToCheck, "beginDate"))
        return res.status(200).send("No beginDate in re");
    return null;
}
exports.default = autoResponser;
