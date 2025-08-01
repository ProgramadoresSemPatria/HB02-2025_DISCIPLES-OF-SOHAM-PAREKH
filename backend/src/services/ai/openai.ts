import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { RelocationAIResponseData, relocationAIResponseSchema, vacationAIResponseSchema } from "../../schemas/travel-plan";
import { VacationResponse } from "../../interfaces/travel-plan";

export class OpenAIService {
    async structureVacationContent(rawContent: string): Promise<VacationResponse> {
        try {
            const result = await generateObject({
                model: openai("gpt-4o-mini"),
                prompt: this.getVacationStructuringPrompt(rawContent),
                schema: vacationAIResponseSchema,
            });

            return result.object as VacationResponse;
        } catch (error) {
            console.error("Error in OpenAI for vacation structuring:", error);
            throw new Error("Failed to structure vacation content");
        }
    }

    async structureRelocationContent(rawContent: string): Promise<RelocationAIResponseData> {
        try {
            const result = await generateObject({
                model: openai("gpt-4o-mini"),
                prompt: this.getRelocationStructuringPrompt(rawContent),
                schema: relocationAIResponseSchema,
            });

            return result.object as RelocationAIResponseData;
        } catch (error) {
            console.error("Error in OpenAI for relocation structuring:", error);
            throw new Error("Failed to structure relocation content");
        }
    }

    private getVacationStructuringPrompt(content: string): string {
        return `
Transform this travel guide content into a structured JSON format optimized for frontend consumption.

**CRITICAL REQUIREMENTS:**
1. Extract exact numerical values for costs (no ranges like "$15-25", use separate min/max)
2. Create individual activity objects with specific details
3. Separate attractions by category (free/paid/optional)
4. Convert tables and lists into proper JSON arrays
5. Make all content ready for React components

**Required JSON Structure:**
{
  "overview": {
    "climate": "Brief climate description",
    "bestTime": "Best time to visit",
    "characteristics": "Key characteristics of the destination"
  },
  "itinerary": [
    {
      "day": 1,
      "morning": {
        "name": "Activity name",
        "location": "Specific location",
        "cost": 0,
        "duration": "2-3 hours",
        "description": "What you'll do and see"
      },
      "afternoon": {
        "name": "Activity name", 
        "location": "Specific location",
        "cost": 15,
        "duration": "3-4 hours",
        "description": "Activity description"
      },
      "evening": {
        "name": "Activity name",
        "location": "Specific location", 
        "cost": 10,
        "duration": "2 hours",
        "description": "Evening activity description"
      },
      "dailyCost": 35,
      "notes": ["Practical tip 1", "Cost-saving tip 2"]
    }
  ],
  "costs": {
    "accommodation": { "min": 15, "max": 25, "notes": "Hostels, shared rooms" },
    "food": { "min": 10, "max": 15, "notes": "Supermarkets, street food" },
    "transportation": { "min": 5, "max": 7, "notes": "Metro day pass, walking" },
    "attractions": { "min": 0, "max": 10, "notes": "Many free museums" },
    "miscellaneous": { "min": 3, "max": 5, "notes": "Water, souvenirs" },
    "totalDaily": { "min": 33, "max": 50 }
  },
  "attractions": [
    {
      "name": "Sacré-Cœur Basilica",
      "cost": 0,
      "category": "free",
      "description": "Beautiful basilica with city views",
      "tips": ["Free entry", "Best at sunset", "Avoid crowds early morning"]
    }
  ],
  "tips": [
    {
      "category": "transportation",
      "title": "Getting Around",
      "content": "Use metro day pass for convenience, walk to save money"
    }
  ],
  "comparisons": [
    {
      "destination": "Barcelona, Spain",
      "dailyBudget": { "min": 25, "max": 40 },
      "notes": "Cheaper accommodation and food options"
    }
  ]
}

**Original content:**
"""${content}"""

Return ONLY valid JSON. Ensure all numbers are actual numbers, not strings.
`;
    }

    private getRelocationStructuringPrompt(content: string): string {
        return `
Organize this relocation guide information into structured topics.

**Instructions:**
- Separate into logical topics: Cost of Living, Visas, Taxes, Climate, Job Market, etc.
- Keep content detailed and practical
- Maintain original information, just organize better

**Original content:**
"""${content}"""

Return in JSON format with topics containing title, content, and category.
`;
    }
}
