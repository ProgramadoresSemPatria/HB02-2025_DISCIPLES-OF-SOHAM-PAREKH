import { type NextFunction, type Request, type Response, Router } from 'express';
import { getAuth } from '@clerk/express';
import { DIContainer } from '../di/container';
import { TravelPlanController } from '../http/controllers/travel-plan';

const router = Router();

const getTravelPlanController = (): TravelPlanController => {
  return DIContainer.getInstance().getTravelPlanController();
};

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try { 
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Authentication required. Please provide valid Clerk authentication headers.' 
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Authentication required. Please provide valid Clerk authentication headers.' 
    });
  }
};

router.post('/', requireAuth, async (req, res) => {
  const controller = getTravelPlanController();
  return controller.createPlan(req, res);
});

router.get('/', requireAuth, async (req, res) => {
  const controller = getTravelPlanController();
  return controller.getUserPlans(req, res);
});

router.get('/:id', requireAuth, async (req, res) => {
  const controller = getTravelPlanController();
  return controller.getPlanById(req, res);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const controller = getTravelPlanController();
  return controller.deletePlan(req, res);
});

export default router;
