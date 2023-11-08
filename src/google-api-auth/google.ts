import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

// import * as dotenv from "dotenv";
// dotenv.config();

export const getGoogleAuthSheets = async () => {
  const projectId = process.env.project_id;
  const client_email = process.env.client_email;
  const private_key = process.env.GOOGLE_SECRET_ACCESS_KEY;
  const spreadsheetId = process.env.SHEETS;
  //   console.log({ projectId, client_email, private_key, spreadsheetId });

  const auth = new GoogleAuth({
    projectId: projectId,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    credentials: {
      client_email: client_email,
      private_key: private_key,
    },
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
};
