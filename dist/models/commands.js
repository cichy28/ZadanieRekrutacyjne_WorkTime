"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandModel = exports.isCommand = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ajv_1 = __importDefault(require("ajv"));
var ajv = new ajv_1.default();
// 2. Create a validation schema - AJV.
var validationSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        command: { type: "string" },
        description: { type: "string" },
        timestamp: { type: "string" },
    },
    required: ["userId", "command"],
    additionalProperties: false,
};
// 3. Create validation function - AJV
exports.isCommand = ajv.compile(validationSchema);
// 4. Create a Schema corresponding to the document interfac - MongoDB.
var modelSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    command: { type: String, required: true },
    description: { type: String, required: false },
    timestamp: { type: String, required: false },
}, { timestamps: true, _id: false });
// 5. Create a Model - MongoDB
exports.commandModel = mongoose_1.default.model("Commands", modelSchema);
