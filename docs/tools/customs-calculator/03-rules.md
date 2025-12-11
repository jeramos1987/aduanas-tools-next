# Reglas de Negocio: Calculadora de Aduanas

## Fórmulas de Cálculo

Las siguientes fórmulas definen la lógica central de la calculadora, basadas en la normativa aduanera estándar.

### 1. Valor en Aduana (CIF)
Es la base tributaria.
> **CIF** = FOB + Flete + Seguro + Otros Costos

### 2. Derechos Arancelarios (Duty)
Impuesto aplicado sobre el valor en aduana.
> **Duty** = CIF * Tasa Ad Valorem

### 3. Base Imponible IGV
Monto sobre el cual se aplica el IGV.
> **Base IGV** = CIF + Duty

### 4. IGV (Impuesto General a las Ventas)
Incluye IGV e IPM.
> **IGV** = Base IGV * Tasa IGV (ej. 18%)

### 5. Percepción
Pago adelantado de impuestos futuros.
> **Monto Percepción** = (CIF + Duty + IGV) * Tasa Percepción

### 6. Total Tributos
Lo que cobra la aduana como impuesto definitivo.
> **Total Tributos** = Duty + IGV

### 7. Total a Pagar (Cashflow)
Monto líquido necesario para el levante.
> **Total a Pagar** = Total Tributos + Monto Percepción

## Validaciones
*   Los valores monetarios (FOB, Flete, Seguro) no pueden ser negativos.
*   Las tasas deben ser porcentajes válidos (0 <= tasa <= 1).
