# Reglas de Negocio: Calculadora de Intereses de Derechos Aduaneros

## Fórmulas de Cálculo

Las fórmulas se basan en la normativa de actualización de deuda de la SUNAT (Código Tributario).

### 1. Cálculo de Días de Mora
Determina el periodo de aplicación del interés.
> **Días** = (Fecha de Pago - Fecha de Cómputo)

### 2. Tasa de Interés Moratorio (TIM)
Se utiliza la TIM diaria vigente establecida por SUNAT.
*   El cálculo considera las variaciones de la TIM en el tiempo si el periodo abarca cambios de tasa.
*   **Factor Acumulado:** Sumatoria de las TIM diarias correspondientes a cada día del periodo de mora.

### 3. Interés Moratorio
Monto adicional generado por el atraso.
> **Interés** = Importe Deuda (USD) * Factor Acumulado

### 4. Deuda Total
Monto final a cancelar.
> **Total** = Importe Deuda (USD) + Interés

## Validaciones y Condiciones
*   **Moneda:** El cálculo se realiza en Dólares Americanos (USD) según indicación del usuario, aunque el pago final en bancos se realice usualmente en Soles al tipo de cambio del día.
*   **Fechas:**
    *   La *Fecha de Pago* debe ser igual o posterior a la *Fecha de Cómputo*.
    *   Si las fechas son iguales, el interés es 0.
*   **Tipos de DAM:**
    *   La herramienta distingue entre DAM Anticipada y Diferida principalmente para guiar al usuario en la selección correcta de la *Fecha de Cómputo* (vencimiento), pero el cálculo matemático del interés opera de igual forma sobre los días transcurridos.
*   **TIM:** Se asume el uso de la TIM vigente para obligaciones en moneda extranjera si la deuda se mantiene en USD, o la conversión pertinente si se aplicara en MN (en esta versión se calcula sobre el monto ingresado en USD).
