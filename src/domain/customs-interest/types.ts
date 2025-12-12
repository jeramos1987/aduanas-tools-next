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
    /**
     * Fecha de pago (Fin del periodo de interés)
     */
    paymentDate: Date;

    /**
     * Tipo de cambio venta vigente a la fecha de pago
     * Se usa para la conversión y redondeo final (regla SUNAT)
     */
    exchangeRate: number;
}

export interface CustomsInterestResult {
    daysDelay: number;
    interestFactor: number;
    interestAmount: number;
    totalDebt: number;
    /**
     * Total deuda en Soles (aplicando redondeo oficial)
     */
    totalDebtInSoles: number;
}
