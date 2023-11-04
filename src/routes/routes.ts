import { Request, Response, Router } from "express";
import { getAuthSheets } from "../google-api-auth/auth";
import { ExpensesType, MonthStatusType, ResidentType } from "../types/types";
const route = Router();

route.get("/month-status", async (req: Request, res: Response) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

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

    const [
      [label1, totalOfMonth],
      [label2, totalExpenses],
      [label3, balance],
      [label4, currentMonth],
    ] = _balance.data.values as any;

    return res.status(200).json({
      status: true,
      //   datas: balance.data,
      datas: { currentMonth, totalOfMonth, totalExpenses, balance },
    });
  } catch (error: any) {
    return res.status(501).json({
      status: false,
      error: error.message,
    });
  }
});

route.get("/payers", async (req: Request, res: Response) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
  try {
    const payers = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "api!A2:B13",
    });

    const data: ResidentType[] = [];

    payers.data.values?.map((item) => {
      // const id = item[0] as string;
      // data[id] = item[1];
      const [name, status] = item;
      data.push({ name, status });
    });

    return res.status(200).json({
      status: true,
      //   datas: payers.data,
      datas: data,
    });
  } catch (error: any) {
    return res.status(501).json({
      status: false,
      error: error.message,
    });
  }
});

route.get("/expenses", async (req: Request, res: Response) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  try {
    const expenses = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "api!G3:L21",
    });

    const data: ExpensesType[] = [];
    const size = expenses.data.values?.length - 1;

    expenses.data.values?.map((item, index) => {
      if (index < size - 1) {
        const [_index, desc, date, value, author, link] = item;
        if (desc == "" || desc == undefined) {
          return;
        }
        data.push({ desc, author, value, date, link });
      }
    });

    return res.status(200).json({
      status: true,
      data: data,
      total: expenses.data.values[size][1] || "Invalida",
      // data: expenses.data,
    });
  } catch (error: any) {
    return res.status(200).json({
      status: false,
      error: error?.message || "houve um erro interno",
    });
  }
});

route.get("/get-datas", async (req: Request, res: Response) => {});

export default route;
