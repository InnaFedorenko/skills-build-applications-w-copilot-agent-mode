"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
exports.startServer = startServer;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
var app_2 = require("./app");
Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return app_2.createApp; } });
const app = (0, app_1.createApp)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
function startServer() {
    return app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
}
if (require.main === module) {
    startServer();
}
