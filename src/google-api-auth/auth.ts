import { google } from "googleapis";
const spreadsheetId = process.env.SHEETS;

export const getAuthSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const spreadsheetId = "1C7xaYkzDgszfZNuqzXMK_QKmWr6jbwjUs4QIK28HBaE";

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
};
