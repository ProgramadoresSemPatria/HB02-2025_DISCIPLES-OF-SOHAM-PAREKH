import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useTravelPlansList, useTravelPlan } from "../hooks/useTravelPlan";
import { Trash2, Eye, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { useState } from "react";

const ListTravelPlansPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  const { data: plansData, isLoading, error } = useTravelPlansList();
  const { deleteTravelPlan } = useTravelPlan();
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getTypeColor = (type: string) => {
    return type === "VACATION" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
  };

  const getBudgetColor = (budgetLevel: string) => {
    switch (budgetLevel) {
      case "LOW":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteClick = (planId: string) => {
    setPlanToDelete(planId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!planToDelete) return;

    try {
      await deleteTravelPlan.mutateAsync(planToDelete);
      setIsDeleteDialogOpen(false);
      setPlanToDelete(null);
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Error deleting plan. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setPlanToDelete(null);
  };

  // Check if user is authenticated
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => window.location.href = '/authenticate'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading plans: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-orange-300 to-green-900 bg-clip-text text-transparent">
              My Travel Plans
            </h1>
            
            
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{plansData?.total || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Vacations</p>
              <p className="text-2xl font-bold text-blue-600">
                {plansData?.travelPlans?.filter(p => p.type === "VACATION").length || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Relocations</p>
              <p className="text-2xl font-bold text-green-600">
                {plansData?.travelPlans?.filter(p => p.type === "RELOCATION").length || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-purple-600">
                {plansData?.travelPlans?.filter(p => {
                  const planDate = p.createdAt ? new Date(p.createdAt) : new Date();
                  const now = new Date();
                  return planDate.getMonth() === now.getMonth() && 
                         planDate.getFullYear() === now.getFullYear();
                }).length || 0}
              </p>
            </div>
          </div>

          {/* Plans List */}
          {plansData?.travelPlans && plansData.travelPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plansData.travelPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {plan.destination}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(plan.type)}`}>
                      {plan.type === "VACATION" ? "Vacation" : "Relocation"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Budget:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetColor(plan.budgetLevel)}`}>
                        {plan.budgetLevel === "LOW" ? "Low" : 
                         plan.budgetLevel === "HIGH" ? "High" : "Medium"}
                      </span>
                    </div>

                    {plan.days && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="text-sm font-medium text-gray-900">{plan.days} days</span>
                      </div>
                    )}

                    {plan.budget && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Budget:</span>
                        <span className="text-sm font-medium text-gray-900">${plan.budget}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm text-gray-500">{plan.createdAt ? formatDate(plan.createdAt) : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate(`/${plan.type === "VACATION" ? "vacation-plan" : "relocation-plan"}/${plan.id}`)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition duration-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <AlertDialog open={isDeleteDialogOpen && planToDelete === plan.id} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                          <Button
                            disabled={deleteTravelPlan.isPending}
                            variant="outline"
                            className="px-3 py-2 border-red-300 text-red-700 text-sm rounded-lg hover:bg-red-50 transition duration-200"
                            onClick={() => handleDeleteClick(plan.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Travel Plan</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete your travel plan to{" "}
                              <span className="font-semibold">{plan.destination}</span>? 
                              This action cannot be undone and will permanently remove this plan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleConfirmDelete}
                              className="bg-red-600 hover:bg-red-700 text-white"
                              disabled={deleteTravelPlan.isPending}
                            >
                              {deleteTravelPlan.isPending ? "Deleting..." : "Delete Plan"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">✈️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No plans found
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first travel plan to start planning your next adventure!
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => navigate("/create-vacation")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Vacation
                  </Button>
                  <Button
                    onClick={() => navigate("/create-relocation")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Relocation
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ListTravelPlansPage; 