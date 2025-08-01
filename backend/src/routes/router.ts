import cors from "cors";
import express, {
	type Express,
	Router,
} from "express";
import travelPlansRoutes from "./travel-plans";
import { clerkMiddleware } from "@clerk/express";

const setupRoutes = (app: Express) => {
	app.use(express.json());
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN || "",
			methods: ["GET", "POST", "OPTIONS"],
		}),
	);

	const appRouter = Router();
	
	appRouter.use(clerkMiddleware());

	appRouter.use('/travel-plans', travelPlansRoutes);

	appRouter.get('/', (req, res) => {
		res.status(401).json({ 
			error: 'Unauthorized', 
			message: 'Authentication required. Please provide valid Clerk authentication headers.' 
		});
	});

	app.use("/api", appRouter);
};

export default setupRoutes;
