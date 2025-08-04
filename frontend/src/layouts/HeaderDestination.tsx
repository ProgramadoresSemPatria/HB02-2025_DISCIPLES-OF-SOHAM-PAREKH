import { Plane } from "lucide-react";
import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
export default function HeaderDestination() {
    return (
        <>
            <Header />
        <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-yellow-100"
        />
        <div className="relative bg-gradient-to-r from-primary/10 via-transparent to-accent/10">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Plane className="h-12 w-12 text-primary" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Smart Travel Assistant
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your AI-powered companion for vacation planning and relocation guidance to any destination worldwide
              </p>
            </div>
          </div>
        </div>
      </header>
      <Outlet/>
      </>
    )
}