import express, { Express, Request, Response, Router } from "express";
import cors from "cors";

const setupRoutes = (app: Express) => {
    app.use(express.json())
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN || "",
            methods: ["GET", "POST", "OPTIONS"],
        })
    );

    const appRouter = Router();

    appRouter.get("/", (_req: Request, res: Response) => {
        res.json({ message: "OK" });
    });

    app.use("/api", appRouter);
};

export default setupRoutes;