# Definición: Calculadora de Aduanas

## Objetivo Principal
El objetivo de esta herramienta es calcular los impuestos aduaneros y costos asociados a una importación basándose en el valor de la mercancía y otros factores logísticos. Está diseñada para proporcionar un desglose claro de los tributos a pagar (Ad Valorem, IGV, Percepción) para ayudar en la planificación financiera de las importaciones.

## Alcance
La herramienta toma datos de entrada clave y calcula los siguientes valores:

### Datos de Entrada
*   **FOB (Free On Board):** Valor de la mercancía.
*   **Flete:** Costo del transporte internacional.
*   **Seguro:** Costo del seguro de transporte.
*   **Otros Costos:** Gastos adicionales (opcional).
*   **Tasas:** Ad Valorem (Derechos Arancelarios), IGV, IPM (incluido en IGV generalmente), y Percepción.

### Resultados
*   **Valor en Aduana (CIF):** Base para el cálculo de impuestos.
*   **Derechos Arancelarios (Ad Valorem):** Impuesto base.
*   **Base Imponible IGV:** Valor CIF + Derechos.
*   **IGV + IPM:** Impuesto General a las Ventas.
*   **Percepción:** Cobro adelantado del IGV.
*   **Total de Impuestos:** Suma de derechos e IGV.
*   **Total a Pagar:** Impuestos + Percepción (Cashflow requerido).

## Usuario Objetivo
Usuarios que necesitan estimar rápidamente los costos fiscales de nacionalización de mercancías en aduanas.
