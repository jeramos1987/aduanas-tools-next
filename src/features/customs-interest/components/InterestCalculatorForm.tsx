import React, { useState } from 'react';
import { DamType } from '../types';
import { DAM_TYPE_LABELS } from '../constants';

interface Props {
    onCalculate: (data: {
        debtAmount: number;
        damType: DamType;
        computationDate: string;
        paymentDate: string;
    }) => void;
}

export function InterestCalculatorForm({ onCalculate }: Props) {
    const [debtAmount, setDebtAmount] = useState<string>('');
    const [damType, setDamType] = useState<DamType>('ANTICIPATED');
    const [computationDate, setComputationDate] = useState<string>('');
    const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!debtAmount || !computationDate || !paymentDate) return;

        onCalculate({
            debtAmount: parseFloat(debtAmount),
            damType,
            computationDate,
            paymentDate,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="debtAmount" className="block text-sm font-medium text-gray-700">
                        Importe de Derechos Aduaneros (USD)
                    </label>
                    <div className="mt-1">
                        <input
                            type="number"
                            id="debtAmount"
                            step="0.01"
                            min="0"
                            required
                            value={debtAmount}
                            onChange={(e) => setDebtAmount(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de DAM</label>
                    <div className="mt-1 grid grid-cols-2 gap-3">
                        {(Object.keys(DAM_TYPE_LABELS) as DamType[]).map((type) => (
                            <div
                                key={type}
                                className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium uppercase sm:flex-1 ${damType === type
                                    ? 'bg-violet-600 text-white border-transparent hover:bg-violet-700'
                                    : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                                    }`}
                                onClick={() => setDamType(type)}
                            >
                                {DAM_TYPE_LABELS[type]}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="computationDate" className="block text-sm font-medium text-gray-700">
                            Fecha de Cómputo (Inicio)
                        </label>
                        <div className="mt-1">
                            <input
                                type="date"
                                id="computationDate"
                                required
                                value={computationDate}
                                onChange={(e) => setComputationDate(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Fecha siguiente al vencimiento.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
                            Fecha de Pago
                        </label>
                        <div className="mt-1">
                            <input
                                type="date"
                                id="paymentDate"
                                required
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                >
                    Calcular Intereses
                </button>
            </div>
        </form>
    );
}
