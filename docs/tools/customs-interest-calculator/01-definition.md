# Definición: Calculadora de Intereses de Derechos Aduaneros

## Objetivo Principal
El objetivo de esta herramienta es calcular el interés moratorio aplicable a los derechos aduaneros (deuda tributaria aduanera) utilizando la fórmula oficial de la SUNAT. Permite a los importadores y agentes de aduana estimar el monto adicional a pagar cuando se exceden los plazos establecidos, facilitando la regularización de obligaciones.

## Alcance
La herramienta procesa la deuda y fechas clave para determinar el interés acumulado:

### Datos de Entrada
*   **Importe de Derechos Aduaneros:** El monto base de la deuda en Dólares Americanos (USD).
*   **Tipo de DAM:**
    *   **DAM Anticipada:** Declaración numerada antes de la llegada del medio de transporte.
    *   **DAM Diferida:** Declaración numerada después de la llegada.
*   **Fecha de Cómputo (Inicio):** Fecha desde la cual se empiezan a contabilizar los intereses (depende del tipo de DAM y fecha de numeración/vencimiento).
*   **Fecha de Pago:** Fecha estimada en la que se realizará el pago (por defecto: fecha actual).
*   **Tipo de Cambio (Venta):** Valor del tipo de cambio venta vigente a la fecha de pago. Debe ingresarse manualmente. [Consultar Tipo de Cambio SUNAT](https://ww3.sunat.gob.pe/cl-ad-ittipocambioconsulta/TipoCambioS01Alias?accion=consultarTipoCambio).

### Resultados
*   **Días de Atraso:** Cantidad de días transcurridos entre la fecha de cómputo y la fecha de pago.
*   **Factor de Interés / TIM:** Tasa aplicada según el periodo.
*   **Total Intereses:** Monto calculado de intereses moratorios.
*   **Deuda Total Actualizada:** Suma de los derechos originales más los intereses calculados (en USD).
*   **Deuda Total en Soles:** Conversión del monto total a moneda nacional usando el tipo de cambio ingresado (aplicando redondeo Sunat).

## Usuario Objetivo
Importadores, auxiliares de despacho y agentes de aduana que necesitan actualizar deudas tributarias vencidas o proyectar pagos fuera de plazo.
