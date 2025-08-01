import { TravelPlanRepository } from "../repositories/travel-plan";
import { TravelPlanService } from "../services/travel-plan";
import { PerplexityService } from "../services/ai/perplexity";
import { OpenAIService } from "../services/ai/openai";
import { TravelPlanController } from "../http/controllers/travel-plan";
import { PrismaClient } from "../../generated/client.js";

export class DIContainer {
  private static instance: DIContainer;
  private prisma: PrismaClient;
  private travelPlanRepository: TravelPlanRepository;
  private perplexityService: PerplexityService;
  private openAIService: OpenAIService;
  private travelPlanService: TravelPlanService;
  private travelPlanController: TravelPlanController;

  private constructor() {
    this.prisma = new PrismaClient();
    this.travelPlanRepository = new TravelPlanRepository(this.prisma);
    this.perplexityService = new PerplexityService();
    this.openAIService = new OpenAIService();
    this.travelPlanService = new TravelPlanService(
      this.travelPlanRepository,
      this.perplexityService,
      this.openAIService
    );
    this.travelPlanController = new TravelPlanController(this.travelPlanService);
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  getTravelPlanController(): TravelPlanController {
    return this.travelPlanController;
  }
}
