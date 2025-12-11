# Flujo de Trabajo: Calculadora de Intereses de Derechos Aduaneros

## 1. Ingreso del Importe Base
El usuario ingresa el monto de la deuda tributaria aduanera:
*   **Importe (USD):** Valor de los derechos aduaneros pendientes de pago.

## 2. Definición del Escenario (Tipo de DAM)
El usuario selecciona la modalidad de despacho para determinar las reglas de vencimiento:
*   **DAM Anticipada:** Implica plazos específicos vinculados a la fecha de llegada o numeración.
*   **DAM Diferida:** Plazos vinculados a la fecha de numeración.

## 3. Establecimiento de Fechas
El sistema solicita las fechas para el cálculo del periodo de mora:
*   **Fecha de Cómputo:** El usuario ingresa la fecha inicial desde donde se debe contabilizar el interés (día siguiente al vencimiento).
*   **Fecha de Pago:** El usuario selecciona la fecha en la que planea pagar (se pre-llena con la fecha actual "hoy").

## 4. Proceso de Cálculo
El sistema ejecuta la lógica de actualización de deuda:
1.  Calcula el número de días transcurridos entre la *Fecha de Cómputo* y la *Fecha de Pago*.
2.  Obtiene la Tasa de Interés Moratorio (TIM) diaria vigente para el periodo (utilizando la fórmula y factores oficiales de SUNAT).
3.  Aplica el factor acumulado al importe base.

## 5. Visualización de Resultados
Se presenta al usuario:
*   El cálculo detallado de días.
*   El monto correspondiente a los intereses.
*   El total consolidado a pagar.
