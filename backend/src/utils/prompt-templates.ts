export class PromptTemplates {
  static getVacationPrompt(destination: string, days: number, budgetLevel: string): string {
    const budgetContext = this.getBudgetContext(budgetLevel);
    
    return `
Create a comprehensive travel guide for ${destination} with the following specifications:

**Trip Context:**
- Destination: ${destination}
- Duration: ${days} days
- Budget: ${budgetLevel} (${budgetContext})

**Required Information:**
1. Destination overview (climate, best time to visit, general characteristics)
2. Day-by-day itinerary optimized for ${days} days
3. Detailed cost breakdown by category
4. Must-see attractions and local experiences
5. Practical tips (transportation, food, local culture)
6. Cost comparison with similar destinations

Focus on practical, up-to-date information suitable for a ${budgetLevel} budget.
Include estimated costs in USD and alternatives for different price ranges.
Provide actionable recommendations and insider tips.
`;
  }

  static getRelocationPrompt(destination: string): string {
    return `
Create a comprehensive relocation guide for moving to ${destination}:

**Essential Information:**
1. Monthly cost of living breakdown (housing, food, utilities, transportation, healthcare)
2. Visa and residency process (steps, required documents, timelines)
3. Tax system (income tax, property tax, VAT, etc.)
4. Climate and quality of life (annual sunshine days, happiness index, safety)
5. Job market and opportunities by sector
6. Healthcare and education systems
7. Banking and financial services for expats
8. Cultural adaptation and local customs
9. Comparison with other popular expat destinations

**Format Requirements:**
- Factual and current information (2024-2025 data)
- Quantitative comparisons when possible
- Practical step-by-step guidance for the relocation process
- References to official resources and websites
- Costs in both USD and local currency

Destination: ${destination}
Focus on actionable information for someone seriously considering relocating.
`;
  }

  private static getBudgetContext(level: string): string {
    const contexts = {
      LOW: "up to $50/day - hostels, public transport, local food",
      MEDIUM: "$50-150/day - mid-range hotels, mixed transport, local restaurants", 
      HIGH: "$150+/day - premium hotels, private transport, fine dining"
    };
    return contexts[level as keyof typeof contexts] || contexts.MEDIUM;
  }
}
