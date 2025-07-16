import React from 'react'

function Blog() {
    return (
        <div className='gradient-background2 py-3'>
            <article
                className="mx-auto overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg gradient-background2 p-6 mb-10"
                style={{ maxWidth: "1200px" }}
            >

                <img
                    alt="Car on AutoMarket"
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
                    className="h-96 w-full object-cover rounded-lg"
                />

                <div className="bg-white p-4 sm:p-6 rounded-lg mt-4">
                    <time datetime="2025-07-05" className="block text-xs text-gray-500"> 5th Jul 2025 </time>

                    <a href="#">
                        <h3 className="mt-0.5 text-lg text-gray-900">Why AutoMarket is the Go-To Platform for Car Buyers and Sellers</h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        Over 85% of users surveyed found AutoMarket highly effective for buying and selling new and used cars. With intuitive search filters, transparent pricing, and a seamless listing process, AutoMarket makes finding or selling your dream car easier than ever.
                    </p>
                </div>
            </article>
        </div>

    )
}

export default Blog