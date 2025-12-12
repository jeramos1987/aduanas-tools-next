# Referencia Técnica - Customs Interest Calculator

> [!IMPORTANT]
> Este documento debe actualizarse cada vez que se realicen cambios en la implementación de la herramienta.

## Archivos y Estructura

La herramienta "Calculadora de Intereses Aduaneros" se encuentra en `src/features/customs-interest`.

### Componentes de React (`src/features/customs-interest/components`)
- **`InterestCalculatorForm.tsx`**: Formulario de entrada.
  - Campos: Deuda original, Tipo de DAM (solo referencia), Fecha de exigibilidad, Fecha de pago.
  - Valida que la fecha de pago sea posterior a la de exigibilidad.

### Lógica de Dominio (`src/domain/customs-interest/calculator.ts`)
- **`calculateCustomsInterest`**: Función pura que realiza el cálculo de interés simple.
- **`types.ts`**: Definiciones de tipos (`CustomsInterestInput`, `CustomsInterestResult`).

### Hook (`src/features/customs-interest/hooks`)
- **`useCustomsInterestCalculator.ts`**: Gestiona el estado de resultados y adapta los datos del formulario (strings) a los tipos del dominio (números/fechas).

## Detalles de Implementación

### Algoritmo de Interés
La calculadora utiliza el método de **Interés Simple** (según implementación actual MVP).

#### Constantes
- `DAILY_TIM`: Tasa de Interés Moratorio diaria referencial. Implementada como **0.0003** (aprox 0.03% diario o 0.9% mensual).

#### Proceso de Cálculo
1.  **Normalización de fechas**: Se ignoran las horas, se comparan solo días calendario.
2.  **Cálculo de Días de Atraso**:
    ```typescript
    DaysDelay = PaymentDate - ComputationDate
    ```
    Si es menor o igual a 0, no hay intereses.
3.  **Factor Acumulado**:
    ```typescript
    InterestFactor = DaysDelay * DAILY_TIM
    ```
4.  **Monto de Interés**:
    ```typescript
    InterestAmount = DebtAmount * InterestFactor
    ```
5.  **Total Deuda**:
    ```typescript
    TotalDebt = DebtAmount + InterestAmount
    ```
6.  **Conversión a Soles**:
    Se aplica la tasa de cambio y se redondea según regla SUNAT (número entero).
    ```typescript
    TotalSoles = Math.round(TotalDebt * ExchangeRate)
    ```

## Suposiciones y Limitaciones
- **Capitalización**: Actualmente no aplica capitalización de intereses (interés compuesto), lo cual puede aplicar en casos reales de multas con más de un año de antigüedad (reglas de TIM capitalizada anual).
- **TIM Variable**: Usa una TIM fija. En producción real, debería consultar una tabla histórica de tasas de interés de SUNAT.
