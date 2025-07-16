import React from 'react'

function InfoSection() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                    <div>
                        <div className="max-w-lg md:max-w-none">
                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                Mercedes-Benz E-Class Sedan: Where Luxury Meets Innovation
                            </h2>

                            <p className="mt-4 text-gray-700">
                                The Mercedes-Benz E-Class represents the perfect balance of comfort, performance, and cutting-edge technology. With its refined interior featuring premium materials and intuitive MBUX infotainment system, every journey becomes an experience of pure luxury.
                            </p>

                            <p className="mt-4 text-gray-700">
                                Engineered with advanced safety features including Active Brake Assist and Blind Spot Assist, the E-Class doesn't just deliver exceptional performance—it prioritizes your peace of mind on every drive.
                            </p>
                        </div>
                    </div>

                    <div>
                        <img
                            src="https://media.oneweb.mercedes-benz.com/images/dynamic/europe/ZA/214004/806/iris.png?q=COSY-EU-100-1713d0VXqaWFqtyO67PobzIr3eWsrrCsdRRzwQZQ9vZbMw3SGtxmFtsd2BdcUfNLkXGEjaRJ0leDlOB2KBjbApvPlI5uOeYQC3iSQkzN4tZm7j06vhKVBpN%25vqAI%25yLR5YXYaxC4SrH1gObnMrEqioTnqQXM4FzC2Tg9ig96PD4PNSeWqaItsdUsTcUaqKDTb32VXq0SeYVKf%25XEd9B96N683eUHpi3v1LlbMKsh&imgt=P27&bkgnd=9&pov=BE040&uni=m&width=880&crop="
                            className="rounded"
                            alt="Mercedes-Benz E-Class Sedan"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoSection