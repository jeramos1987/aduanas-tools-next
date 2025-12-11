import { useState } from 'react';
import { CustomsInterestInput, CustomsInterestResult, DamType } from '../types';
import { calculateCustomsInterest } from '@/domain/customs-interest/calculator';

export function useCustomsInterestCalculator() {
    const [result, setResult] = useState<CustomsInterestResult | null>(null);

    const calculate = (data: {
        debtAmount: number;
        damType: DamType;
        computationDate: string;
        paymentDate: string;
    }) => {
        // Convert strings to Date objects ensuring local timezone handling or UTC as needed
        // For simplicity treating strings yyyy-mm-dd as dates
        const input: CustomsInterestInput = {
            debtAmount: Number(data.debtAmount),
            damType: data.damType,
            computationDate: new Date(data.computationDate + 'T00:00:00'),
            paymentDate: new Date(data.paymentDate + 'T00:00:00'),
        };

        const res = calculateCustomsInterest(input);
        setResult(res);
    };

    const reset = () => {
        setResult(null);
    };

    return {
        result,
        calculate,
        reset,
    };
}
