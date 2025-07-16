// import { UserButton, useUser } from '@clerk/clerk-react'
// import React from 'react'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'

// function Header() {

//     const { user, isSignedIn } = useUser()

//     console.log('isSignedIn:', isSignedIn, 'user:', user);

//     return (
//         <div className='flex justify-between items-center p-4 shadow-sm gradient-background2'>
//             <img src="/logo.jpg" alt="logo" width={200} height={200} className='zoom rounded-lg' />

//             <ul className='hidden md:flex gap-16 text-lg font-semibold'>
//                 <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-indigo-500 text-white'>Home</li>
//                 <li className='font-medium hover:scale-105 transition-all hover:text-indigo-500 cursor-pointer text-white'>Search</li>
//                 <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-indigo-500 text-white'>New</li>
//                 <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-indigo-500 text-white'>Preowned</li>
//             </ul>
//             {isSignedIn ?
//                 <div className='flex items-center gap-5'>
//                     <UserButton />
//                     <Link to={'/profile'}>
//                         <Button>Submit Listing</Button>
//                     </Link>


//                 </div>
//                 : <Button>Submit Listing</Button>
//             }
//         </div>
//     )
// }

// export default Header


import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
    const { user, isSignedIn, isLoaded } = useUser();

    console.log('isSignedIn:', isSignedIn, 'user:', user);

    // Show loading state while Clerk fetches auth data
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-between items-center p-4 shadow-sm gradient-background2">
            <img
                src="/logo.jpg"
                alt="logo"
                width={200}
                height={200}
                className="zoom rounded-lg"
            />

            <ul className="hidden md:flex gap-16 text-lg font-semibold">
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-indigo-500 text-white">
                    <Link to="/">Home</Link>
                </li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-indigo-500 text-white">
                    <Link to="/search">Search</Link>
                </li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-indigo-500 text-white">
                    <Link to="/new">New</Link>
                </li>
                <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-indigo-500 text-white">
                    <Link to="/preowned">Preowned</Link>
                </li>
            </ul>

            {isSignedIn ? (
                <div className="flex items-center gap-5">
                    <UserButton />
                    <Link to="/profile">
                        <Button>Submit Listing</Button>
                    </Link>
                </div>
            ) : (
                <div className="flex items-center gap-5">
                    <Link to="/sign-in">
                        <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link to="/sign-in">
                        <Button>Submit Listing</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Header;