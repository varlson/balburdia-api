"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../google-api-auth/auth");
const route = (0, express_1.Router)();
route.get("/month-status", async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await (0, auth_1.getAuthSheets)();
    try {
        const _balance = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "api!D2:E5",
        });
        // const mes = _balance.data.values[0][1];
        // const saldoInicial = _balance.data.values[1][1];
        // const despesa = _balance.data.values[2][1];
        // const saldoAtual = _balance.data.values[3][1];
        const [[label1, totalOfMonth], [label2, totalExpenses], [label3, balance], [label4, currentMonth],] = _balance.data.values;
        return res.status(200).json({
            status: true,
            //   datas: balance.data,
            datas: { currentMonth, totalOfMonth, totalExpenses, balance },
        });
    }
    catch (error) {
        return res.status(501).json({
            status: false,
            error: error.message,
        });
    }
});
route.get("/payers", async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await (0, auth_1.getAuthSheets)();
    try {
        const payers = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "api!A2:B13",
        });
        const data = {};
        payers.data.values?.map((item) => {
            const id = item[0];
            data[id] = item[1];
        });
        return res.status(200).json({
            status: true,
            //   datas: payers.data,
            datas: data,
        });
    }
    catch (error) {
        return res.status(501).json({
            status: false,
            error: error.message,
        });
    }
});
route.get("/expenses", async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await (0, auth_1.getAuthSheets)();
    try {
        const expenses = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "api!G3:K21",
        });
        const data = [];
        const size = expenses.data.values?.length - 1;
        expenses.data.values?.map((item, index) => {
            if (index < size - 1) {
                const [_index, desc, date, value, author] = item;
                data.push({ desc, author, value, date });
            }
        });
        return res.status(200).json({
            status: true,
            data: data,
            total: expenses.data.values[size][1],
            // data: expenses.data,
        });
    }
    catch (error) {
        return res.status(200).json({
            status: false,
            error: error?.message || "houve um erro interno",
        });
    }
});
exports.default = route;