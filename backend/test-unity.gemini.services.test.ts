import { describe,it,expect,vi, beforeEach} from "vitest";
import { OpenAIService } from 'src/services/ai/openai';
import { openai } from "@ai-sdk/openai";
import { generateId, generateObject} from 'ai'
import { 
    RelocationAIResponseData,
    relocationAIResponseSchema,
    vacationAIResponseSchema,
} from 'src/schemas/travel-plan'
import { VacationResponse } from "@/interfaces/travel-plan";

vi.mock('@ai-sdk/openai',
     () => ({openai: vi.fn(),

}));   

vi.mock('ai', () => ({
    generateObject: vi.fn(),
}))
describe('OpenAIService', () => {
  let openaiService: OpenAIService;
  const mockModel = {} as any;
  const mockVacationContent = "Paris travel guide...";
  const mockRelocationContent = "Relocating to Berlin guide...";

  beforeEach(() => {
    vi.clearAllMocks();
    openaiService = new OpenAIService();
    
    // Configura o mock da OpenAI
    (openai as unknown as vi.Mock).mockReturnValue(mockModel);
  });

  describe('structureVacationContent', () => {
    it('should structure vacation content successfully', async () => {
      const mockResponse: VacationResponse = {
        overview: {
          climate: "Temperate",
          bestTime: "Spring",
          characteristics: "Romantic, Historic"
        },
        itinerary: [{
            day: 1,
            morning: {
                name: "Eiffel Tower",
                location: "Champ de Mars",
                cost: 25,
                duration: "2-3 hours",
                description: "Visit the iconic tower"
            },
            afternoon: {
                name: "",
                location: "",
                cost: 0,
                duration: "",
                description: ""
            },
            evening: {
                name: "",
                location: "",
                cost: 0,
                duration: "",
                description: ""
            },
            dailyCost: 25,
            notes: ["Buy tickets in advance"],
            // afternoon and evening are omitted as they are optional
        }],
        costs: {
          accommodation: {
              min: 100, max: 200,
              notes: ""
          },
          food: {
              min: 20, max: 40,
              notes: ""
          },
          transportation: {
              min: 10, max: 30,
              notes: ""
          },
          attractions: {
              min: 15, max: 25,
              notes: ""
          },
          miscellaneous: {
              min: 5, max: 15,
              notes: ""
          },
          totalDaily: { min: 150, max: 250 }
        }
      };

     (generateObject as jest.moc).mockResolvedValue({
        object: mockResponse
      });

      const result = await openaiService.structureVacationContent(mockVacationContent);

      expect(generateObject).toHaveBeenCalledWith({
        model: mockModel,
        prompt: expect.stringContaining("Transform this travel guide content"),
        schema: vacationAIResponseSchema
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API fails', async () => {
      (generateObject as ViMock).mockRejectedValue(new Error("API Error"));

      await expect(
        openaiService.structureVacationContent(mockVacationContent)
      ).rejects.toThrow("Failed to structure vacation content");
    });

    it('should validate the response schema', async () => {
      const invalidResponse = { invalid: "data" };
      (generateObject as jest.Mock).mockResolvedValue({
        object: invalidResponse
      });

      await expect(
        openaiService.structureVacationContent(mockVacationContent)
      ).rejects.toThrow();
    });
  });

  describe('structureRelocationContent', () => {
    it('should structure relocation content successfully', async () => {
      const mockResponse: RelocationAIResponseData = {
        topics: [
          {
            title: "Cost of Living",
            content: "Housing costs in Berlin...",
            category: "financial"
          }
        ]
      };

      (generateObject as jest.Mock).mockResolvedValue({
        object: mockResponse
      });

      const result = await openaiService.structureRelocationContent(mockRelocationContent);

      expect(generateObject).toHaveBeenCalledWith({
        model: mockModel,
        prompt: expect.stringContaining("Organize this relocation guide"),
        schema: relocationAIResponseSchema
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors gracefully', async () => {
      (generateObject as jest.Mock).mockRejectedValue(new Error("API Error"));

      await expect(
        openaiService.structureRelocationContent(mockRelocationContent)
      ).rejects.toThrow("Failed to structure relocation content");
    });

    it('should respect budget constraints in vacation content', async () => {
      const mockResponse: VacationResponse = {
        overview: { climate: "", bestTime: "", characteristics: "" },
        itinerary: [],
        costs: {
          accommodation: {
              min: 100, max: 200,
              notes: ""
          },
          totalDaily: { min: 50, max: 300 }
        }
      };

      (generateObject as jest.Mock).mockResolvedValue({
        object: mockResponse
      });

      const result = await openaiService.structureVacationContent(mockVacationContent);
      
      // Verifica se os valores numéricos estão corretos
      expect(result.costs.accommodation.min).toBeLessThanOrEqual(result.costs.accommodation.max);
      expect(result.costs.totalDaily.min).toBeLessThanOrEqual(result.costs.totalDaily.max);
    });
  });

  describe('prompt generation', () => {
    it('should generate valid vacation prompt', () => {
      const prompt = openaiService['getVacationStructuringPrompt']("test content");
      
      expect(prompt).toContain("Transform this travel guide content");
      expect(prompt).toContain("CRITICAL REQUIREMENTS:");
      expect(prompt).toContain("test content");
    });

    it('should generate valid relocation prompt', () => {
      const prompt = openaiService['getRelocationStructuringPrompt']("test content");
      
      expect(prompt).toContain("Organize this relocation guide");
      expect(prompt).toContain("test content");
    });
  });
});

