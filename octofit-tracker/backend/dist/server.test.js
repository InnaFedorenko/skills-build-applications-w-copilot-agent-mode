"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("./server");
(0, node_test_1.default)('health endpoint returns server status', async () => {
    const app = (0, server_1.createApp)();
    const response = await (0, supertest_1.default)(app).get('/api/health');
    strict_1.default.equal(response.status, 200);
    strict_1.default.equal(response.body.status, 'ok');
});
(0, node_test_1.default)('users endpoint returns a collection', async () => {
    const app = (0, server_1.createApp)();
    const response = await (0, supertest_1.default)(app).get('/api/users');
    strict_1.default.equal(response.status, 200);
    strict_1.default.ok(Array.isArray(response.body));
});
