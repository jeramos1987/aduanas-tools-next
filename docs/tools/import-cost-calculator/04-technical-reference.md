# Referencia Técnica - Import Cost Calculator (Costeo)

> [!IMPORTANT]
> Este documento debe actualizarse cada vez que se realicen cambios en la implementación de la herramienta.

## Archivos y Estructura

La herramienta "Calculadora de Costos de Importación" se encuentra en `src/features/import-calculator`.

### Componentes de React (`src/features/import-calculator/components`)
- **`ImportCalculatorScreen.tsx`** (o similar): Componente orquestador (Smart).
- **`CalculatorForm.tsx`**: Formulario de entrada de datos.
  - Gestiona el estado local `formData`: categoría, FOB, CBM, origen, destino, cantidad.
  - Carga selectores dinámicos desde archivos JSON.
- **`SimulationPanel.tsx`**: Panel de control para el modo "Jugar con números".
  - Permite modificar variables globales temporalmente (ej. tasa de percepción) mediante `overrides`.
- **`ResultsDisplay.tsx`**: Visualización de los costos desglosados.

### Lógica de Negocio (`src/features/import-calculator/utils`)
- **`calculateCosts.ts`**: Contiene la función principal `calculateImportCosts`.
  - Esta función integra los inputs del usuario con los datos estáticos (tarifas, categorías).

### Datos Estáticos (`src/features/import-calculator/data` o referencias)
La herramienta depende de archivos JSON para configurar reglas de negocio sin recompilar código complejo.
- **`tarifas_importacion.json`**: Define costos logísticos (flete, gastos origen/destino) según origen y rango de CBM.
- **`categorias_producto.json`**: Define el arancel base y factor de seguro por tipo de producto.
- **`variables_globales.json`**: Constantes como IGV, IPM, tasas por defecto de percepción y seguro.

## Detalles de Implementación

### Flujo de Datos
1.  **Input**: Usuario llena `CalculatorForm`.
2.  **Cálculo Inicial**: Al hacer submit, se llama a `calculateImportCosts` con los datos del form y sin overrides.
3.  **Simulación**: El usuario interactúa con `SimulationPanel` (ej. cambia percepción). Esto actualiza el estado de `overrides` en el componente padre.
4.  **Recálculo**: El componente padre vuelve a llamar a `calculateImportCosts(formData, overrides)` para actualizar los resultados.

### Sistema de "Overrides"
Para permitir simulaciones sin corromper los datos originales, la función de cálculo acepta un segundo parámetro opcional:
```typescript
type CalculationOverrides = {
    perceptionRate?: number;
    insuranceRate?: number;
};
```
Si un valor existe en `overrides`, tiene precedencia sobre el valor por defecto o calculado.

## Algoritmos y Lógica

### Selección de Tarifa Logística
Se busca en `tarifas_importacion.json` la primera coincidencia que cumpla:
- `origen` coincidente (ej. "China - Shenzhen").
- `cbm` del usuario dentro del rango `[rango_cbm_min, rango_cbm_max)`.
Si no se encuentra, se usa un fallback ("default").

### Lógica de Costos

#### 1. Flete y Gastos Locales
Se toman directamente del objeto de tarifa encontrado.

#### 2. Seguro
```typescript
TasaSeguro = Override ?? (Categoria.seguro_factor || Global.seguro_default_pct)
Seguro = (FOB + Flete) * TasaSeguro
```

#### 3. Impuestos (Tributos)
- **Ad Valorem**: `CIF * (Categoria.arancel_base_pct / 100)`
- **IGV**: `(CIF + AdValorem) * (Global.igv_pct + Global.ipm_pct)`
- **Percepción**: 
  ```typescript
  TasaPercepcion = Override ?? Global.percepcion_base_pct
  Percepcion = (CIF + AdValorem + IGV) * TasaPercepcion
  ```

#### 4. Costo Total (Landed Cost)
```typescript
TotalUSD = CIF + AdValorem + IGV + Percepcion + GastosOrigen + GastosDestino
TotalSOL = TotalUSD * Global.tasa_cambio_referencial
UnitCost = TotalUSD / Cantidad
```
