import "dotenv/config";
import express, { type Request, type Response } from "express";
import setupRoutes from "./routers/routes";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware());

setupRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
