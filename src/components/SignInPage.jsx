import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function SignInPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="mb-6">
                <img src="/logo.jpg" alt="Logo" width={150} height={150} className="rounded-lg" />
            </div>
            <SignIn
                routing="hash"

                afterSignInUrl="/profile"
                signUpUrl="/sign-up" // Optional: if you have a sign-up route
            />
            <Link to="/" className="mt-4 text-blue-500 hover:underline">
                Back to Home
            </Link>
        </div>
    );
}

export default SignInPage;