import React from 'react'
import { Button } from './components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import Blog from './components/Blog'

function Home() {
    return (
        <div>
            {/* Header */}
            <Header />
            {/* Hero */}
            <Hero />
            {/* Category */}
            <Category />
            {/* Most searched car */}
            <MostSearchedCar />
            {/* Info Section */}
            <InfoSection />
            {/* BLog */}
            <Blog />
            {/* Footer  */}
            <Footer />

        </div>
    )
}

export default Home