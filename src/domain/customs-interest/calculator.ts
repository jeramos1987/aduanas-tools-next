import { CustomsInterestInput, CustomsInterestResult } from './types';

// Tasa de Interés Moratorio (TIM) Diaria Referencial
// Nota: En una implementación real, esto debería venir de una base de datos histórica
// Valor aproximado: 0.045% diario (varía según normativa SUNAT)
// Usamos 0.0003 como ejemplo conservador o el valor que el usuario solicite si se hace configurable.
// Para este MVP usaremos una constante.
const DAILY_TIM = 0.0003; // Ejemplo: 0.9% mensual / 30

/**
 * Calcula los intereses moratorios de una deuda aduanera
 */
export function calculateCustomsInterest(input: CustomsInterestInput): CustomsInterestResult {
    const { debtAmount, computationDate, paymentDate } = input;

    // 1. Calcular días de atraso
    // Normalizamos las fechas a medianoche para evitar errores por horas
    const start = new Date(computationDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(paymentDate);
    end.setHours(0, 0, 0, 0);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Si la fecha de pago es anterior o igual a la de cómputo, no hay interés
    if (diffDays <= 0) {
        return {
            daysDelay: 0,
            interestFactor: 0,
            interestAmount: 0,
            totalDebt: debtAmount
        };
    }

    // 2. Calcular factor acumulado
    // Fórmula simple: Días * Tasa Diaria
    // Fórmula compuesta (si aplicara capitalización, pero SUNAT usa interés simple usualmente para tributos, 
    // aunque a veces hay capitalización anual. Usaremos interés simple para esta versión MVP).
    const interestFactor = diffDays * DAILY_TIM;

    // 3. Calcular monto de interés
    const interestAmount = debtAmount * interestFactor;

    // 4. Calcular total
    const totalDebt = debtAmount + interestAmount;

    return {
        daysDelay: diffDays,
        interestFactor,
        interestAmount,
        totalDebt
    };
}
