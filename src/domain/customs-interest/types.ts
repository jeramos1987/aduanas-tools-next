/**
 * Tipos de datos para el dominio de cálculo de intereses aduaneros
 */

export type DamType = 'ANTICIPATED' | 'DEFERRED';

export interface CustomsInterestInput {
    /**
     * Importe de la deuda aduanera en USD
     */
    debtAmount: number;

    /**
     * Tipo de declaración (Anticipada o Diferida)
     * Esto influye en la fecha de inicio del cómputo
     */
    damType: DamType;

    /**
     * Fecha de cómputo (Inicio del periodo de interés)
     */
    computationDate: Date;

    /**
     * Fecha de pago (Fin del periodo de interés)
     */
    paymentDate: Date;
}

export interface CustomsInterestResult {
    daysDelay: number;
    interestFactor: number;
    interestAmount: number;
    totalDebt: number;
}
