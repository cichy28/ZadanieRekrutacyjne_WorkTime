"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommand = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ajv_1 = __importDefault(require("ajv"));
var ajv = new ajv_1.default();
// 2. Create a validation schema - AJV.
var schema = {
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
var isCommand = ajv.compile(schema);
exports.isCommand = isCommand;
// 4. Create a Schema corresponding to the document interfac - MongoDB.
var commandSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    command: { type: String, required: true },
    description: { type: String, required: false },
    timestamp: { type: String, required: true },
}, { timestamps: true });
// 5. Create a Model - MongoDB
var commandModel = mongoose_1.default.model("Commands", commandSchema);
exports.default = commandModel;
