import { perplexity } from "@ai-sdk/perplexity";
import { generateText } from "ai";
import { AIGenerationRequest } from "../../interfaces/ai";

export class PerplexityService {
  async generateResponse(request: AIGenerationRequest): Promise<string> {
    try {
      const result = await generateText({
        model: perplexity(request.model || "sonar"),
        prompt: request.prompt,
      });

      return result.text;
    } catch (error) {
      console.error("Error in Perplexity service:", error);
      throw new Error("Failed to generate content with Perplexity");
    }
  }
}