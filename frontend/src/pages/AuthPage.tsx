import { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          TravelWise
        </h1>
        <p className="text-muted-foreground">
          {isLogin ? "Welcome back to your travel assistant" : "Create your account to get started"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SignIn />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SignUp />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleForm}
        className="mt-6 text-sm text-blue-600 hover:underline transition"
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
