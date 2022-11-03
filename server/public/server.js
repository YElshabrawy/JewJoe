"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import routes from './routes';
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// routes(app);
app.listen(PORT, () => console.log('Up and running on http://localhost:' + PORT));
