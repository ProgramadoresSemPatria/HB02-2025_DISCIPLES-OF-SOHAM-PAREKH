import { SignIn } from "@clerk/clerk-react";


export function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    TravelWise
                </h1>
                <p className="text-muted-foreground">Welcome back to your travel assistant</p>
            </div>
            <SignIn />  
        </div>
    );
}