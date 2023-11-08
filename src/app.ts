import { getAuthSheets } from "./google-api-auth/auth";
import express, { Request, Response } from "express";
const app = express();
import route from "./routes/routes";
// import dotenv from "dotenv";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    msg: "Hello World! Balburdianos!",
  });
});

app.use("/api", route);

app.listen(PORT, () => {
  console.log("HTTP Server running! " + PORT);
});
