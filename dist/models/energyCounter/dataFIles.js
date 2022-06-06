"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isData = exports.DataModel = void 0;
var mongoose_1 = require("mongoose");
var ajv_1 = __importDefault(require("ajv"));
var ajv = new ajv_1.default();
var dataFilesSchema = new mongoose_1.Schema({
    nameOfDataset: { type: String },
    userId: { type: String },
    tarif: { type: String },
    orderedPower: { type: Number },
    powerConnectionId: { type: String },
    data: { type: [], required: true },
}, { timestamps: true, _id: true });
// 5. Create a Model - MongoDB
exports.DataModel = (0, mongoose_1.model)("dataFiles", dataFilesSchema);
// 2. Create a validation schema - AJV.
var validationSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        data: { type: "object" },
    },
    required: ["userId", "data"],
    additionalProperties: false,
};
// 3. Create validation function - AJV
exports.isData = ajv.compile(validationSchema);
