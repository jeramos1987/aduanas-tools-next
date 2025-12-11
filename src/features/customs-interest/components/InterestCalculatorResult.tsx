import React from 'react';
import { CustomsInterestResult } from '../types';

interface Props {
    result: CustomsInterestResult;
}

export function InterestCalculatorResult({ result }: Props) {
    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Resultado del Cálculo</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Días de Atraso</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-semibold">
                            {result.daysDelay} días
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Factor de Interés</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {result.interestFactor.toFixed(6)}
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6 bg-purple-50">
                        <dt className="text-sm font-medium text-gray-900">Interés Moratorio</dt>
                        <dd className="mt-1 text-lg font-bold text-purple-700 sm:col-span-2 sm:mt-0">
                            {formatMoney(result.interestAmount)}
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6 bg-violet-50">
                        <dt className="text-base font-medium text-gray-900">Total Deuda Actualizada</dt>
                        <dd className="mt-1 text-xl font-bold text-violet-700 sm:col-span-2 sm:mt-0">
                            {formatMoney(result.totalDebt)}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
