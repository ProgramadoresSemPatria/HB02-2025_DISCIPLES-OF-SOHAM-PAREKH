import { Request, Response } from "express";
import { TravelPlanService } from "@/services/travel-plan";
import { createTravelPlanSchema } from "@/schemas/travel-plan";
import { getAuth } from "@clerk/express";
import { ErrorHandler } from "@/utils/error-handler";

export class TravelPlanController {
  constructor(private travelPlanService: TravelPlanService) { }

  async createPlan(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = createTravelPlanSchema.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          error: "Invalid data",
          details: validationResult.error.errors,
        });
        return;
      }

      const { userId } = getAuth(req);
      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const result = await this.travelPlanService.createTravelPlan(
        userId,
        validationResult.data
      );

      res.status(201).json(result);
    } catch (error) {
      ErrorHandler.handle(error, res, 'create plan');
    }
  }

  async getUserPlans(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const plans = await this.travelPlanService.getUserTravelPlans(userId);
      res.json(plans);
    } catch (error) {
      ErrorHandler.handle(error, res, 'get user plans');
    }
  }

  async getPlanById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { userId } = getAuth(req);

      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const plan = await this.travelPlanService.getTravelPlanById(id, userId);

      if (!plan) {
        res.status(404).json({ error: "Plan not found" });
        return;
      }

      res.json(plan);
    } catch (error) {
      ErrorHandler.handle(error, res, 'get plan by id');
    }
  }

  async updatePlan(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { userId } = getAuth(req);

      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const result = await this.travelPlanService.updateTravelPlan(id, userId, req.body);
      res.json(result);
    } catch (error) {
      ErrorHandler.handle(error, res, 'update plan');
    }
  }

  async deletePlan(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { userId } = getAuth(req);

      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      await this.travelPlanService.deleteTravelPlan(id, userId);
      res.status(204).send();
    } catch (error) {
      ErrorHandler.handle(error, res, 'delete plan');
    }
  }
}
