"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes/routes"));
// import dotenv from "dotenv";
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
    return res.status(200).json({
        msg: "Hello World! Balburdianos!",
    });
});
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    console.log("HTTP Server running! " + PORT);
});
