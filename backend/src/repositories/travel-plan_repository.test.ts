import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient} from '@prisma/client';
import { TravelPlanRepository } from '../travel-plan';
import { TravelPlanEntity, TravelPlanRequest } from '../../interfaces/travel-plan';
import { budgetLevel, planType } from 'generated/enums';

// Mock do PrismaClient
const prismaMock = {
  travelPlan: {
    create: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
} as unknown as PrismaClient;

describe('TravelPlanRepository', () => {
  let repository: TravelPlanRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new TravelPlanRepository(prismaMock);
  });

  describe('create', () => {
    it('should create a new travel plan', async () => {              // test for creating a travel plan
      const mockData = {
        clerkUserId: 'user_123',
        destination: 'Paris',
        type: "VACATION" as planType, 
        budgetLevel: 'MEDIUM' as budgetLevel,
        days: 7,
        budget: 5000,
        itinerary: { day1: 'Arrival' },
        costSummary: { total: 5000 },
        additionalInfo: { notes: 'Test' },
      };

      const mockResult: TravelPlanEntity = {
        ...mockData,
        id: 'plan_123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.travelPlan.create.mockResolvedValue(mockResult);

      const result = await repository.create(mockData);

      expect(prismaMock.travelPlan.create).toHaveBeenCalledWith({
        data: mockData,
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('findByUserId', () => {
    it('should return travel plans for a user', async () => {          // test for finding travel plans by user id
      const mockPlans: TravelPlanEntity[] = [
        {
          id: 'plan_123',
          clerkUserId: 'user_123',
          destination: 'Paris',
          type: 'VACATION',
          budgetLevel: 'MEDIUM',
          days: 7,
          budget: 5000,
          costSummary: { total: 5000 },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.travelPlan.findMany.mockResolvedValue(mockPlans);

      const result = await repository.findByUserId('user_123');

      expect(prismaMock.travelPlan.findMany).toHaveBeenCalledWith({          // check if the method is called with correct parameters
        where: { clerkUserId: 'user_123' },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          destination: true,
          type: true,
          budgetLevel: true,
          days: true,
          createdAt: true,
          updatedAt: true,
          clerkUserId: true,
          budget: true,
          costSummary: true,
          additionalInfo: false,
          itinerary: false,
        },
      });
      expect(result).toEqual(mockPlans);
    });
  });

  describe('findByIdAndUserId', () => {
    it('should return a travel plan by id and user id', async () => {      // test for finding a travel plan by id and user id
      const mockPlan: TravelPlanEntity = {
        id: 'plan_123',
        clerkUserId: 'user_123',
        destination: 'Paris',
        type: 'VACATION',
        budgetLevel: 'MEDIUM',
        days: 7,
        budget: 5000,
        itinerary: { day1: 'Arrival' },
        costSummary: { total: 5000 },
        additionalInfo: { notes: 'Test' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.travelPlan.findFirst.mockResolvedValue(mockPlan);

      const result = await repository.findByIdAndUserId('plan_123', 'user_123');

      expect(prismaMock.travelPlan.findFirst).toHaveBeenCalledWith({
        where: { id: 'plan_123', clerkUserId: 'user_123' },
      });
      expect(result).toEqual(mockPlan);
    });

    it('should return null if plan not found', async () => {      // test for finding a travel plan that does not exist
      prismaMock.travelPlan.findFirst.mockResolvedValue(null);

      const result = await repository.findByIdAndUserId('plan_999', 'user_123');

      expect(result).toBeNull();
    });
  });

  describe('updateByIdAndUserId', () => {               // test for updating a travel plan
    it('should update a travel plan', async () => {
      const updateData: Partial<TravelPlanRequest> = {
        destination: 'London',
        days: 10,
      };

      const updatedPlan: TravelPlanEntity = {
        id: 'plan_123',
        clerkUserId: 'user_123',
        destination: 'London',
        type: 'VACATION',
        budgetLevel: 'MEDIUM',
        days: 10,
        budget: 5000,
        itinerary: { day1: 'Arrival' },
        costSummary: { total: 5000 },
        additionalInfo: { notes: 'Test' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.travelPlan.update.mockResolvedValue(updatedPlan);

      const result = await repository.updateByIdAndUserId(
        'plan_123',
        'user_123',
        updateData
      );

      expect(prismaMock.travelPlan.update).toHaveBeenCalledWith({
        where: { id: 'plan_123' },
        data: {
          ...updateData,
          updatedAt: expect.any(Date),
        },
      });
      expect(result).toEqual(updatedPlan);
    });
  });

  describe('deleteByIdAndUserId', () => {                 // test for deleting a travel plan
    it('should delete a travel plan', async () => {
      const mockPlan: TravelPlanEntity = {
        id: 'plan_123',
        clerkUserId: 'user_123',
        destination: 'Paris',
        type: 'VACATION',
        budgetLevel: 'MEDIUM',
        days: 7,
        budget: 5000,
        itinerary: { day1: 'Arrival' },
        costSummary: { total: 5000 },
        additionalInfo: { notes: 'Test' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.travelPlan.delete.mockResolvedValue(mockPlan);

      const result = await repository.deleteByIdAndUserId('plan_123', 'user_123');

      expect(prismaMock.travelPlan.delete).toHaveBeenCalledWith({
        where: { id: 'plan_123', clerkUserId: 'user_123' },
      });
      expect(result).toEqual(mockPlan);
    });
  });

  describe('existsByIdAndUserId', () => {          // test for checking if a travel plan exists
    it('should return true if plan exists', async () => {
      prismaMock.travelPlan.findFirst.mockResolvedValue({ id: 'plan_123' });

      const result = await repository.existsByIdAndUserId('plan_123', 'user_123');

      expect(result).toBe(true);
    });

    it('should return false if plan does not exist', async () => {
      prismaMock.travelPlan.findFirst.mockResolvedValue(null);

      const result = await repository.existsByIdAndUserId('plan_999', 'user_123');

      expect(result).toBe(false);
    });
  });
});