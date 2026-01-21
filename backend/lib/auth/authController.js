"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = loginController;
exports.registerController = registerController;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var userServices_1 = require("../users/userServices");
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userId, user, roleId, secret, token, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, userServices_1.loginUser)(email, password)];
                case 2:
                    userId = _b.sent();
                    if (userId === 0) {
                        return [2 /*return*/, res.status(401).json({
                                message: "Hibas email vagy jelszo"
                            })];
                    }
                    return [4 /*yield*/, (0, userServices_1.getUserById)(userId)];
                case 3:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(500).json({ message: "Felhasznalo nem talalhato" })];
                    }
                    roleId = user.szerepkor_id;
                    secret = config_1.default.jwtSecret;
                    if (!secret) {
                        return [2 /*return*/, res.status(500).json({ message: "JWT secret nincs beallitva" })];
                    }
                    token = jsonwebtoken_1.default.sign({ userId: userId, roleId: roleId }, secret, { expiresIn: config_1.default.jwtExpiresIn });
                    return [2 /*return*/, res.json({
                            message: "Sikeres bejelentkezes",
                            userId: userId,
                            token: token,
                            szerepkor_id: roleId,
                            roleId: roleId
                        })];
                case 4:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [2 /*return*/, res.status(500).json({
                            message: "Szerver hiba"
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name, email, password, userId, err_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    name = (_a = req.body.name) !== null && _a !== void 0 ? _a : req.body.username;
                    email = req.body.email;
                    password = (_b = req.body.password) !== null && _b !== void 0 ? _b : req.body.jelszo;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userServices_1.registerUser)(name, email, password)];
                case 2:
                    userId = _c.sent();
                    return [2 /*return*/, res.json({ userId: userId })];
                case 3:
                    err_2 = _c.sent();
                    console.error(err_2);
                    return [2 /*return*/, res.json({ userId: 0 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
