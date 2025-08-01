import "dotenv/config";
import express from "express";
import setupRoutes from "./routes/router";

const app = express();
setupRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
