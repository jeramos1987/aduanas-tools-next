'use client';

import {
    InterestCalculatorForm,
    InterestCalculatorResult,
    useCustomsInterestCalculator
} from '@/features/customs-interest';

export default function CustomsInterestCalculatorPage() {
    const { result, calculate } = useCustomsInterestCalculator();

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Calculadora de Intereses de Derechos Aduaneros
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Calcula los intereses moratorios de tus deudas aduaneras según la normativa SUNAT.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <InterestCalculatorForm onCalculate={calculate} />
                </div>

                {result && (
                    <InterestCalculatorResult result={result} />
                )}

                <div className="mt-8 bg-violet-50 border-l-4 border-violet-400 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-violet-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-violet-700">
                                <strong>Nota Importante:</strong> El cálculo es referencial y utiliza una tasa de interés moratorio (TIM) estándar. Para pagos definitivos, se recomienda verificar los montos exactos en el portal de SUNAT o consultar con su agente de aduanas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
