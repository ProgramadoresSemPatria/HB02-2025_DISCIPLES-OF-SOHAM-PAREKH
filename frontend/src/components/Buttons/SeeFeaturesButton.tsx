interface SeeFeaturesButtonProps {
  children: React.ReactNode;
}

export default function SeeFeaturesButton({ children }: SeeFeaturesButtonProps) {
  const scrollToTutorial = () => {
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToTutorial}
      className="px-6 py-3 font-semibold rounded-lg shadow-sm border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center gap-2"
    >
      {children}
    </button>
  );
}
