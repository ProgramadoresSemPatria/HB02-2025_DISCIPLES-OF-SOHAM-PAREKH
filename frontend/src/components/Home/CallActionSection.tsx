import StartPlanButton from "../Buttons/StartPlanButton";

export default function CallToActionSection() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4">
        Ready to Start Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400">
          Next Adventure?
        </span>
      </h2>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
        Join thousands of travelers who trust TravelWise for their journey planning needs.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <StartPlanButton>Start Planning for Free</StartPlanButton>
        <p> No credit card needed! </p>
      </div>
    </section>
  );
}
