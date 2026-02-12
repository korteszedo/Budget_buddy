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
exports.addTransactionController = addTransactionController;
exports.getBalanceController = getBalanceController;
exports.getTransactionListController = getTransactionListController;
exports.getExpensesByCategoryController = getExpensesByCategoryController;
var transactionService_1 = require("./transactionService");
function formatDate(date) {
    return date.toISOString().slice(0, 10);
}
function normalizeDate(value) {
    if (typeof value === "string") {
        var trimmed = value.trim();
        if (trimmed.length === 0) {
            return formatDate(new Date());
        }
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            return trimmed;
        }
        var parsed = new Date(trimmed);
        if (!Number.isNaN(parsed.getTime())) {
            return formatDate(parsed);
        }
    }
    return formatDate(new Date());
}
function addTransactionController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, type, amountRaw, amount, categoryRaw, categoryText, categoryIdRaw, categoryIdValue, categoryId, err_1, date, insertId, err_2;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0:
                    userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a userId" })];
                    }
                    type = (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.tipus) !== null && _c !== void 0 ? _c : (_d = req.body) === null || _d === void 0 ? void 0 : _d.type;
                    if (type !== "bevetel" && type !== "kiadas") {
                        return [2 /*return*/, res.status(400).json({ message: "Hibas tipus" })];
                    }
                    amountRaw = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.osszeg) !== null && _f !== void 0 ? _f : (_g = req.body) === null || _g === void 0 ? void 0 : _g.amount;
                    amount = Number(amountRaw);
                    if (!Number.isFinite(amount) || amount <= 0) {
                        return [2 /*return*/, res.status(400).json({ message: "Hibas osszeg" })];
                    }
                    categoryRaw = (_j = (_h = req.body) === null || _h === void 0 ? void 0 : _h.kategoria) !== null && _j !== void 0 ? _j : (_k = req.body) === null || _k === void 0 ? void 0 : _k.category;
                    categoryText = typeof categoryRaw === "string" ? categoryRaw.trim() : "";
                    categoryIdRaw = (_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.kategoria_id) !== null && _m !== void 0 ? _m : (_o = req.body) === null || _o === void 0 ? void 0 : _o.categoryId;
                    categoryIdValue = Number(categoryIdRaw);
                    categoryId = 0;
                    _s.label = 1;
                case 1:
                    _s.trys.push([1, 5, , 6]);
                    if (!(Number.isFinite(categoryIdValue) && categoryIdValue > 0)) return [3 /*break*/, 2];
                    categoryId = categoryIdValue;
                    return [3 /*break*/, 4];
                case 2:
                    if (!categoryText) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, transactionService_1.findOrCreateCategoryId)(categoryText, type)];
                case 3:
                    categoryId = _s.sent();
                    _s.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _s.sent();
                    console.error(err_1);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a kategoria menteseor" })];
                case 6:
                    if (!categoryId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hibas kategoria" })];
                    }
                    date = normalizeDate((_q = (_p = req.body) === null || _p === void 0 ? void 0 : _p.datum) !== null && _q !== void 0 ? _q : (_r = req.body) === null || _r === void 0 ? void 0 : _r.date);
                    _s.label = 7;
                case 7:
                    _s.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, (0, transactionService_1.addTransactionForUser)(userId, categoryId, amount, type, date)];
                case 8:
                    insertId = _s.sent();
                    return [2 /*return*/, res.status(201).json({ id: insertId })];
                case 9:
                    err_2 = _s.sent();
                    console.error(err_2);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a tranzakcio menteseor" })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function getBalanceController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, balance, err_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a userId" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, transactionService_1.getBalanceByUserId)(userId)];
                case 2:
                    balance = _b.sent();
                    return [2 /*return*/, res.json({
                            egyenleg: balance
                        })];
                case 3:
                    err_3 = _b.sent();
                    console.error(err_3);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba egyenleg lekérésekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getTransactionListController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, list, err_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a userId" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, transactionService_1.getTransactionList)(userId)];
                case 2:
                    list = _b.sent();
                    return [2 /*return*/, res.json(list)];
                case 3:
                    err_4 = _b.sent();
                    console.error(err_4);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a tranzakciók lekérésekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getExpensesByCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, err_5;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a userId" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, transactionService_1.getExpenseSumsByCategory)(userId)];
                case 2:
                    data = _b.sent();
                    return [2 /*return*/, res.json(data)];
                case 3:
                    err_5 = _b.sent();
                    console.error(err_5);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a kategória összesítésnél" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
