import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
  })
);




app.use(express.json())


app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "OK" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
