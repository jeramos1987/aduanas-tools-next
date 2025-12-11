# Flujo de Trabajo: Calculadora de Aduanas

## 1. Ingreso de Datos
El usuario ingresa los valores monetarios de la operación:
*   Valor FOB (USD)
*   Flete Internacional (USD)
*   Seguro (USD) - *Si no se tiene, se aplica seguro de tabla según partida*
*   Otros Costos (USD)

## 2. Configuración de Tasas
El usuario selecciona o confirma las tasas aplicables:
*   **Ad Valorem:** % según partida arancelaria (0%, 6%, 11%, etc.)
*   **IGV:** % (Generalmente 16% IGV + 2% IPM = 18%)
*   **Percepción:** % (3.5%, 10% u otro según condición del importador)

## 3. Proceso de Cálculo
El sistema procesa la información siguiendo las reglas de negocio:
1.  Calcula el **Valor en Aduana (CIF)**.
2.  Calcula los **Derechos Arancelarios** sobre el CIF.
3.  Determina la **Base Imponible del IGV** (CIF + Derechos).
4.  Calcula el **IGV** sobre la base imponible.
5.  Calcula la **Percepción** sobre el monto total (CIF + Derechos + IGV).

## 4. Visualización de Resultados
Se muestra al usuario:
*   Desglose detallado de cada impuesto.
*   Monto total de tributos aduaneros.
*   Monto total a pagar (incluyendo percepción).
