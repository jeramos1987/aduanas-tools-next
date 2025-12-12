aaaaaaaaa# Referencia Técnica - Customs Calculator (Tributos)

> [!IMPORTANT]
> Este documento debe actualizarse cada vez que se realicen cambios en la implementación de la herramienta.

## Archivos y Estructura

La herramienta "Calculadora de Tributos" se encuentra implementada en la feature `calculator`.

### Componentes de React (`src/features/calculator`)
- **`components/CalculatorScreen.tsx`**: Componente principal (Smart Component). Orquesta la lógica llamando al hook `useCalculator` y renderiza el formulario y los resultados.
- **`components/CalculatorForm.tsx`**: Componente de presentación (Dumb Component) que gestiona los inputs del usuario.
  - Gestiona su propio estado local para los inputs (`fob`, `freight`, etc.).
  - Realiza cálculos en tiempo real para una "vista previa" del Valor en Aduana.
  - Al hacer submit, pasa los datos parseados al componente padre.
- **`hooks/useCalculator.ts`**: Custom Hook que encapsula la lógica de estado de la aplicación.
  - Gestiona el estado de `result` (resultados del cálculo) y `isLoading`.
  - Expone la función `calculate` que invoca la lógica de dominio.

### Lógica de Dominio (`src/domain/customs`)
La lógica de negocio pura está desacoplada de React y reside en el dominio.
- **`taxes.ts`**: Contiene la función principal `calculateCustomsTaxes`.
- **`value.ts`**: Contiene la función auxiliar `calculateCustomsValue`.
- **`types.ts`**: Definiciones de tipos TypeScript compartidos (`CustomsInput`, `CustomsResult`).

## Detalles de Implementación

### Flujo de Datos
1.  **Input**: El usuario ingresa datos en `CalculatorForm`. Los inputs son strings controlados localmente.
2.  **Vista Previa**: `CalculatorForm` convierte los inputs a números y llama a `calculateCustomsValue` en cada render para mostrar el CIF estimado en tiempo real.
3.  **Cálculo**: Al enviar el formulario, `CalculatorScreen` recibe los datos limpios y llama a `useCalculator.calculate`.
4.  **Procesamiento**: `useCalculator` delega el cálculo matemático a `calculateCustomsTaxes` (síncrono).
5.  **Output**: El resultado se guarda en el estado del hook y se propaga a `CalculatorScreen` para su visualización.

### Gestión de Estado
- **Local (Formulario)**: `useState` para cada campo de input (permite validación simple y tipado flexible mientras se escribe).
- **Lógica (Hook)**: `useState` para almacenar el objeto de resultados completo. No se usa gestor de estado global (Zustand/Context) ya que la calculadora es autocontenida.

## Algoritmos y Lógica

### Fórmulas Matemáticas
Las fórmulas se encuentran en `src/domain/customs/taxes.ts` y siguen estrictamente la normativa aduanera peruana.

#### 1. Valor en Aduana (CIF)
Base imponible para todos los impuestos.
```typescript
CustomsValue = FOB + Flete + Seguro + OtrosCostos
```

#### 2. Derechos Arancelarios (Ad Valorem)
Primer impuesto aplicado sobre la base CIF.
```typescript
Duty = CustomsValue * DutyRate
```

#### 3. Base Imponible IGV
El IGV se calcula sobre el Valor en Aduana **más** los Derechos Arancelarios (impuesto sobre impuesto).
```typescript
IGVBase = CustomsValue + Duty
```

#### 4. IGV + IPM
Impuesto General a las Ventas (incluye Impuesto de Promoción Municipal).
```typescript
IGV = IGVBase * IGVRate
```

#### 5. Percepción del IGV
Adelanto de impuesto que se calcula sobre el precio total de importación (CIF + tributos).
```typescript
PerceptionBase = CustomsValue + (Duty + IGV)
Perception = PerceptionBase * PerceptionRate
```

#### 6. Total a Pagar (Cashflow)
Monto líquido necesario para el desaduanaje.
```typescript
TotalAmount = (Duty + IGV) + Perception
```
