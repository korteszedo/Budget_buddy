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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = getUsersController;
exports.updateUserController = updateUserController;
exports.deleteUserController = deleteUserController;
var userServices_1 = require("./userServices");
var ADMIN_ROLE_ID = 1;
function resolveRoleId(req) {
    var _a;
    var roleIdRaw = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.roleId;
    var roleId = typeof roleIdRaw === "string" ? Number(roleIdRaw) : roleIdRaw;
    if (typeof roleId === "number" && Number.isFinite(roleId)) {
        return roleId;
    }
    return null;
}
function ensureAdmin(req, res) {
    var roleId = resolveRoleId(req);
    if (roleId !== ADMIN_ROLE_ID) {
        res.status(403).json({ message: "Nincs jogosultsag" });
        return false;
    }
    return true;
}
function getUsersController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ensureAdmin(req, res)) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userServices_1.getUsersForAdmin)()];
                case 2:
                    users = _a.sent();
                    return [2 /*return*/, res.json(users)];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a felhasznalok lekeresekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateUserController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, name, email, password, affected, err_2;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!ensureAdmin(req, res)) {
                        return [2 /*return*/];
                    }
                    userId = Number(req.params.userId);
                    name = (_b = (_a = req.body.name) !== null && _a !== void 0 ? _a : req.body.username) !== null && _b !== void 0 ? _b : req.body.nev;
                    email = req.body.email;
                    password = (_c = req.body.password) !== null && _c !== void 0 ? _c : req.body.jelszo;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userServices_1.updateUserForRole2)(userId, name, email, password)];
                case 2:
                    affected = _d.sent();
                    return [2 /*return*/, res.json({ affected: affected })];
                case 3:
                    err_2 = _d.sent();
                    console.error(err_2);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a felhasznalo frissitesekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteUserController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, affected, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ensureAdmin(req, res)) {
                        return [2 /*return*/];
                    }
                    userId = Number(req.params.userId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, userServices_1.deleteUserForRole2)(userId)];
                case 2:
                    affected = _a.sent();
                    return [2 /*return*/, res.json({ affected: affected })];
                case 3:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a felhasznalo torlesekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
