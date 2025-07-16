import { faker } from '@faker-js/faker';

function createRandomCarList() {
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/model-navigation/bmw-m8-competition-cabrio-flyout.png?imwidth=768',
        miles: 1000,
        gearType: 'Automatic',
        price: faker.finance.amount({ min: 4000, max: 20000 })

    }
}

const carList = faker.helpers.multiple(createRandomCarList, {
    count: 7
})

export default {
    carList,
}