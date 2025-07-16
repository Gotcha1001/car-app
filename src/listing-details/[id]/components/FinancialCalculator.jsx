import InputField from '@/add-listing/components/InputField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function FinancialCalculator({ carDetail }) {

    const [carPrice, setCarPrice] = useState(0)
    const [interestRate, setInterestRate] = useState(0)
    const [loanTerm, setLoanTerm] = useState(0)
    const [downPayment, setDownPayment] = useState(0)
    const [monthlyPayment, setMonthlyPayment] = useState(0)

    const CalculateMonthlyPayment = () => {
        console.log(carPrice, interestRate, loanTerm, downPayment)
        const Principal = carPrice - downPayment;
        const MonthlyInterestRate = interestRate / 1200 //convert to decimal

        const MonthlyPayment = (Principal * MonthlyInterestRate * Math.pow(1 + MonthlyInterestRate, loanTerm)) /
            (Math.pow(1 + MonthlyInterestRate, loanTerm) - 1);

        setMonthlyPayment(MonthlyPayment.toFixed(2))
    }

    return (
        <div className='p-10 border rounded-xl shadow-md mt-7'>
            <h2 className='text-2xl font-bold gradient-title'>Financial Calculator</h2>
            <div className='flex gap-5 mt-5'>
                <div className="w-full">
                    <label>Price R</label>
                    <Input
                        onChange={(e) => setCarPrice(e.target.value)}
                        type="number" />
                </div>
                <div className="w-full">
                    <label>Interest Rate</label>
                    <Input
                        onChange={(e) => setInterestRate(e.target.value)}
                        type="number" />
                </div>
            </div>
            <div className='flex gap-5 mt-5'>
                <div className="w-full">
                    <label>Loan Term (Months)</label>
                    <Input
                        onChange={(e) => setLoanTerm(e.target.value)}
                        type="number" />
                </div>
                <div className="w-full">
                    <label>Down Payment</label>
                    <Input
                        onChange={(e) => setDownPayment(e.target.value)}
                        type="number" />
                </div>
            </div>
            {monthlyPayment > 0 &&
                <h2 className='font-medium text-2xl gradient-title mt-5'>Your Monthly Payment Is: <span className='text-4xl'>R {monthlyPayment}</span>  </h2>}
            <Button
                onClick={CalculateMonthlyPayment}
                className="w-full mt-3" size="lg">Calculate</Button>
        </div>
    )
}

export default FinancialCalculator