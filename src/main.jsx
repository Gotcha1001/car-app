import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider, SignIn } from '@clerk/clerk-react'
import Home from './Home.jsx'
import Contact from './contact.jsx'
import Profile from './profile/index.jsx'
import AddListing from './add-listing/index.jsx'
import { Toaster } from 'sonner'
import SearchByCategory from './search/[category]/index.jsx'
import SearchByOptions from '../src/search/index.jsx'
import LisingDetail from './listing-details/[id]/index.jsx'
import SignInPage from './components/SignInPage.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/add-listing',
    element: <AddListing />
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  },
  {
    path: '/search/:category',
    element: <SearchByCategory />,
  },
  {
    path: '/search',
    element: <SearchByOptions />,
  },
  {
    path: '/listing-detail/:id',
    element: <LisingDetail key={window.location.pathname} />,
  }
])


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Header /> */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <RouterProvider router={router} />
      <Toaster richColors />
    </ClerkProvider>



  </React.StrictMode>,
)
