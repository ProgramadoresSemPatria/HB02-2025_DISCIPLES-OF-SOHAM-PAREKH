import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTravelPlan } from "@/hooks/useTravelPlan";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Home, MapPin, Calendar, DollarSign } from "lucide-react";

const PlanFormPage = () => {
  const navigate = useNavigate();
  const createTravelPlan = useCreateTravelPlan();
  
  const [selectedType, setSelectedType] = useState<"VACATION" | "RELOCATION" | null>(null);
  const [formData, setFormData] = useState({
    destination: "",
    days: 7,
    budgetLevel: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH"
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createTravelPlan.mutateAsync({
        destination: formData.destination,
        type: selectedType!,
        budgetLevel: formData.budgetLevel,
        days: selectedType === "VACATION" ? formData.days : undefined
      });

      // Redirecionar para a página do plano criado baseado no tipo
      if (selectedType === "VACATION") {
        navigate(`/vacation-plan/${result.id}`);
      } else {
        navigate(`/relocation-plan/${result.id}`);
      }
    } catch (error) {
      console.error("Erro ao criar plano:", error);
      alert("Erro ao criar plano. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getBudgetOptions = () => {
    if (selectedType === "VACATION") {
      return [
        { value: "LOW", label: "Low Budget", range: "$50-100/day" },
        { value: "MEDIUM", label: "Medium Budget", range: "$100-200/day" },
        { value: "HIGH", label: "High Budget", range: "$200-500/day" }
      ];
    } else {
      return [
        { value: "LOW", label: "Low Monthly Budget", range: "$1,500-3,000/month" },
        { value: "MEDIUM", label: "Medium Monthly Budget", range: "$3,000-6,000/month" },
        { value: "HIGH", label: "High Monthly Budget", range: "$6,000-15,000/month" }
      ];
    }
  };

  const handleTypeSelection = (type: "VACATION" | "RELOCATION") => {
    setSelectedType(type);
    // Reset form data when changing type
    setFormData({
      destination: "",
      days: type === "VACATION" ? 7 : 0,
      budgetLevel: "MEDIUM"
    });
  };


  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">What's your plan?</h2>
          <p className="text-muted-foreground text-lg">
            Tell us the purpose of your trip to get personalized recommendations
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
          {/* Vacation Card */}
          <Card 
            className={`p-6 transition-all duration-300 cursor-pointer border-2 ${
              selectedType === "VACATION" 
                ? "scale-105 shadow-xl border-[#E9C0F2] bg-white" 
                : selectedType === "RELOCATION"
                ? "opacity-50 scale-95 hover:opacity-75 hover:scale-100 border-gray-200"
                : "hover:shadow-xl hover:scale-105 border-[#E9C0F2]/50 hover:border-[#E9C0F2]"
            }`}
            onClick={() => handleTypeSelection('VACATION')}
          >
            <div className="text-center space-y-4">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedType === "VACATION" 
                  ? "bg-[#E9C0F2]/20 scale-110" 
                  : "bg-[#E9C0F2]/10"
              }`}>
                <Plane className={`h-6 w-6 transition-all duration-300 ${
                  selectedType === "VACATION" ? "text-[#d860f3] scale-110" : "text-[#E9C0F2]"
                }`} />
              </div>
              <div>
                <h3 className={`text-xl font-semibold text-foreground mb-2 transition-all duration-300 ${
                  selectedType === "VACATION" ? "text-[#d860f3]" : ""
                }`}>Vacation</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Plan your perfect getaway with personalized itineraries, budget estimates, and local recommendations.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                  <li>• Custom itinerary planning</li>
                  <li>• Budget breakdown</li>
                  <li>• Must-see attractions</li>
                  <li>• Local cuisine & hidden gems</li>
                </ul>
              </div>
              <Button 
                variant={selectedType === "VACATION" ? "default" : "outline"}
                size="sm" 
                className={`w-full transition-all duration-300 ${
                  selectedType === "VACATION" 
                    ? "bg-[#d860f3] hover:bg-[#d860f3]/90 text-white" 
                    : "border-[#E9C0F2] text-[#E9C0F2] hover:bg-[#E9C0F2] hover:text-white"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTypeSelection('VACATION');
                }}
              >
                {selectedType === "VACATION" ? "✓ Vacation Selected" : "Plan My Vacation"}
              </Button>
            </div>
          </Card>

          {/* Relocation Card */}
          <Card 
            className={`p-6 transition-all duration-300 cursor-pointer border-2 ${
              selectedType === "RELOCATION" 
                ? "scale-105 shadow-xl border-[#1DC973] bg-white" 
                : selectedType === "VACATION"
                ? "opacity-50 scale-95 hover:opacity-75 hover:scale-100 border-gray-200"
                : "hover:shadow-xl hover:scale-105 border-[#1DC973]/50 hover:border-[#1DC973]"
            }`}
            onClick={() => handleTypeSelection('RELOCATION')}
          >
            <div className="text-center space-y-4">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedType === "RELOCATION" 
                  ? "bg-[#1DC973]/20 scale-110" 
                  : "bg-[#1DC973]/10"
              }`}>
                <Home className={`h-6 w-6 transition-all duration-300 ${
                  selectedType === "RELOCATION" ? "text-[#1DC973] scale-110" : "text-[#1DC973]"
                }`} />
              </div>
              <div>
                <h3 className={`text-xl font-semibold text-foreground mb-2 transition-all duration-300 ${
                  selectedType === "RELOCATION" ? "text-[#1DC973]" : ""
                }`}>Relocation</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Get comprehensive information about living costs, taxes, visas, and quality of life for your move.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                  <li>• Cost of living breakdown</li>
                  <li>• Tax rates & visa requirements</li>
                  <li>• Healthcare & education</li>
                  <li>• Job market insights</li>
                </ul>
              </div>
              <Button 
                variant={selectedType === "RELOCATION" ? "default" : "outline"}
                size="sm" 
                className={`w-full transition-all duration-300 ${
                  selectedType === "RELOCATION" 
                    ? "bg-[#1DC973] hover:bg-[#1DC973]/90 text-white" 
                    : "border-[#1DC973] text-[#1DC973] hover:bg-[#1DC973] hover:text-white"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTypeSelection('RELOCATION');
                }}
              >
                {selectedType === "RELOCATION" ? "✓ Relocation Selected" : "Plan My Move"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Form Section - Only show when a type is selected */}
        {selectedType && (
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl">
              <CardHeader className="text-center space-y-4">
            
                
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {selectedType === "VACATION" ? <Plane className="h-6 w-6" /> : <Home className="h-6 w-6" />}
                </div>
                <CardTitle className="text-2xl font-bold">
                  {selectedType === "VACATION" ? "Plan Your Vacation" : "Plan Your Relocation"}
                </CardTitle>
                <p className="text-muted-foreground">
                  {selectedType === "VACATION" 
                    ? "Tell us about your dream vacation and we'll create a personalized plan"
                    : "Tell us about your relocation goals and we'll provide comprehensive insights"
                  }
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Destination Field */}
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Destination
                    </Label>
                    <Input
                      type="text"
                      id="destination"
                      placeholder="Enter city or country (e.g., Barcelona, Spain)"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="w-full"
                      required
                    />
                  </div>

                  {/* Days Field - Only for Vacation */}
                  {selectedType === "VACATION" && (
                    <div className="space-y-2">
                      <Label htmlFor="days" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Number of Days
                      </Label>
                      <Input
                        type="number"
                        id="days"
                        value={formData.days || ""}
                        onChange={(e) => setFormData({...formData, days: parseInt(e.target.value) || 0})}
                        min="1"
                        max="30"
                        className="w-full"
                        required
                      />
                    </div>
                  )}

                  {/* Budget Level Field */}
                  <div className="space-y-2">
                    <Label htmlFor="budgetLevel" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Budget Level
                    </Label>
                    <Select
                      value={formData.budgetLevel}
                      onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") => 
                        setFormData({...formData, budgetLevel: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget level" />
                      </SelectTrigger>
                      <SelectContent>
                        {getBudgetOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{option.label}</span>
                              <span className="text-sm text-muted-foreground">{option.range}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.destination.trim()}
                    className="w-full"
                  >
                    {isLoading ? "Creating plan..." : `Create ${selectedType === "VACATION" ? "Vacation" : "Relocation"} Plan`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanFormPage; 