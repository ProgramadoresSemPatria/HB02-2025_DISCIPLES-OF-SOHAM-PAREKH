import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import express from "express";
import setupRoutes from "./routers/routes";

const app = express();

app.use(clerkMiddleware());

setupRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
