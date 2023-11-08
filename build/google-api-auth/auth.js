"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthSheets = void 0;
const googleapis_1 = require("googleapis");
const getAuthSheets = async () => {
    const spreadsheetId = process.env.SHEETS;
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = googleapis_1.google.sheets({
        version: "v4",
        auth: client,
    });
    // const spreadsheetId = "1C7xaYkzDgszfZNuqzXMK_QKmWr6jbwjUs4QIK28HBaE";
    return {
        auth,
        client,
        googleSheets,
        spreadsheetId,
    };
};
exports.getAuthSheets = getAuthSheets;
