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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
process.env.JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "test-secret";
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app/app"));
function createUserAndLogin() {
    return __awaiter(this, void 0, void 0, function () {
        var suffix, user, registerResponse, loginResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    suffix = "".concat(Date.now(), "_").concat(Math.floor(Math.random() * 100000));
                    user = {
                        name: "Tx Test User ".concat(suffix),
                        email: "tx_".concat(suffix, "@example.com"),
                        password: "Test1234!",
                    };
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/auth/register").send(user)];
                case 1:
                    registerResponse = _a.sent();
                    expect(registerResponse.status).toBe(200);
                    expect(registerResponse.body.userId).toBeGreaterThan(0);
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default).post("/auth/login").send({
                            email: user.email,
                            password: user.password,
                        })];
                case 2:
                    loginResponse = _a.sent();
                    expect(loginResponse.status).toBe(200);
                    expect(loginResponse.body.token).toEqual(expect.any(String));
                    return [2 /*return*/, loginResponse.body.token];
            }
        });
    });
}
describe("Transactions API", function () {
    var token = "";
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createUserAndLogin()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("GET /transactions/list returns 403 without token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).get("/transactions/list")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it("POST /transactions creates a transaction on success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post("/transactions")
                        .set("Authorization", "Bearer ".concat(token))
                        .send({
                        type: "kiadas",
                        amount: 1200,
                        category: "Teszt kategoria",
                        date: "2026-02-10",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body.id).toEqual(expect.any(Number));
                    expect(response.body.id).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("POST /transactions returns 400 for invalid amount", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post("/transactions")
                        .set("Authorization", "Bearer ".concat(token))
                        .send({
                        type: "kiadas",
                        amount: -50,
                        category: "Teszt kategoria",
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.body.message).toBe("Hibas osszeg");
                    return [2 /*return*/];
            }
        });
    }); });
    it("GET /transactions/list returns transaction array on success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .get("/transactions/list")
                        .set("Authorization", "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(Array.isArray(response.body)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("GET /transactions/balance returns balance on success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .get("/transactions/balance")
                        .set("Authorization", "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toHaveProperty("egyenleg");
                    return [2 /*return*/];
            }
        });
    }); });
    it("GET /transactions/balance returns 403 without token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).get("/transactions/balance")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it("GET /transactions/expenses-by-category returns grouped data on success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .get("/transactions/expenses-by-category")
                        .set("Authorization", "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(Array.isArray(response.body)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("GET /transactions/expenses-by-category returns 403 without token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default).get("/transactions/expenses-by-category")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
});
