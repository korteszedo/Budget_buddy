"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("../router"));
console.log("🔍 router import TYPE:", typeof router_1.default);
console.log("🔍 router import FILE:", require.resolve("../router"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", router_1.default);
console.log("🔧 router import:", router_1.default);
exports.default = app;
