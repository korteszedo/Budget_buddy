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
exports.getGoalsController = getGoalsController;
exports.addGoalController = addGoalController;
exports.updateGoalController = updateGoalController;
exports.deleteGoalController = deleteGoalController;
var goalService_1 = require("./goalService");
function getGoalsController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, goals, err_1;
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
                    return [4 /*yield*/, (0, goalService_1.getGoalsByUserId)(userId)];
                case 2:
                    goals = _b.sent();
                    return [2 /*return*/, res.json(goals)];
                case 3:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [2 /*return*/, res.status(500).json({
                            message: "Hiba a célok lekérésekor"
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addGoalController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, name, targetRaw, currentRaw, deadlineRaw, target, current, deadline, safeCurrent, insertId, err_2;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        return __generator(this, function (_w) {
            switch (_w.label) {
                case 0:
                    userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a userId" })];
                    }
                    name = ((_e = (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.nev) !== null && _c !== void 0 ? _c : (_d = req.body) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "").toString().trim();
                    targetRaw = (_j = (_g = (_f = req.body) === null || _f === void 0 ? void 0 : _f.osszeg_cel) !== null && _g !== void 0 ? _g : (_h = req.body) === null || _h === void 0 ? void 0 : _h.cel) !== null && _j !== void 0 ? _j : (_k = req.body) === null || _k === void 0 ? void 0 : _k.target;
                    currentRaw = (_p = (_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.aktualis_osszeg) !== null && _m !== void 0 ? _m : (_o = req.body) === null || _o === void 0 ? void 0 : _o.aktualis) !== null && _p !== void 0 ? _p : (_q = req.body) === null || _q === void 0 ? void 0 : _q.current;
                    deadlineRaw = (_u = (_s = (_r = req.body) === null || _r === void 0 ? void 0 : _r.hatarido) !== null && _s !== void 0 ? _s : (_t = req.body) === null || _t === void 0 ? void 0 : _t.datum) !== null && _u !== void 0 ? _u : (_v = req.body) === null || _v === void 0 ? void 0 : _v.deadline;
                    target = Number(targetRaw);
                    current = Number(currentRaw);
                    deadline = typeof deadlineRaw === "string" && deadlineRaw.trim() !== ""
                        ? deadlineRaw
                        : null;
                    if (!name || !Number.isFinite(target) || target <= 0) {
                        return [2 /*return*/, res.status(400).json({ message: "Hibas adatok" })];
                    }
                    safeCurrent = Number.isFinite(current) && current > 0 ? current : 0;
                    _w.label = 1;
                case 1:
                    _w.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, goalService_1.addGoalForUser)(userId, name, target, safeCurrent, deadline)];
                case 2:
                    insertId = _w.sent();
                    return [2 /*return*/, res.status(201).json({ id: insertId })];
                case 3:
                    err_2 = _w.sent();
                    console.error(err_2);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a cel mentesekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateGoalController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, goalId, currentRaw, current, affected, err_3;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a userId" })];
                    }
                    goalId = Number(req.params.goalId);
                    if (!goalId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a cel azonosito" })];
                    }
                    currentRaw = (_e = (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.aktualis_osszeg) !== null && _c !== void 0 ? _c : (_d = req.body) === null || _d === void 0 ? void 0 : _d.aktualis) !== null && _e !== void 0 ? _e : (_f = req.body) === null || _f === void 0 ? void 0 : _f.current;
                    current = Number(currentRaw);
                    if (!Number.isFinite(current) || current < 0) {
                        return [2 /*return*/, res.status(400).json({ message: "Hibas aktualis osszeg" })];
                    }
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, goalService_1.updateGoalProgressForUser)(userId, goalId, current)];
                case 2:
                    affected = _g.sent();
                    return [2 /*return*/, res.json({ affected: affected })];
                case 3:
                    err_3 = _g.sent();
                    console.error(err_3);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a cel frissitesekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteGoalController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, goalId, affected, err_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a userId" })];
                    }
                    goalId = Number(req.params.goalId);
                    if (!goalId) {
                        return [2 /*return*/, res.status(400).json({ message: "Hianyzik a cel azonosito" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, goalService_1.deleteGoalForUser)(userId, goalId)];
                case 2:
                    affected = _b.sent();
                    return [2 /*return*/, res.json({ affected: affected })];
                case 3:
                    err_4 = _b.sent();
                    console.error(err_4);
                    return [2 /*return*/, res.status(500).json({ message: "Hiba a cel torlesekor" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
