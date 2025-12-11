# Reglas de Negocio y Cálculo

Este documento define las fórmulas y la lógica que debe seguir el motor de cálculo de la herramienta.

## Fuentes de Datos
*   **Tarifas:** `src/data/tarifas_importacion.json`
*   **Categorías:** `src/data/categorias_producto.json`
*   **Variables Globales:** `src/data/variables_globales.json` (tasas de seguro, IGV, IPM, TC referencial).

## Fórmulas de Cálculo

El cálculo sigue la secuencia lógica de una importación estándar en Perú.

### 1. Valor en Aduana (CIF)
El valor CIF es la base imponible para los impuestos.

*   **Seguro** = `(FOB + Flete)` * `seguro_pct`
    *   *Nota: `seguro_pct` se obtiene de `variables_globales.json` o input de usuario. Si es teórico, suele ser un porcentaje de la suma FOB+Flete o tabla de seguro.*
    *   *Regla Simplificada (común): `FOB * seguro_pct` (Verificar preferencia usuario, usaremos fórmula dada en prompt: (FOB+Flete)*pct).*
*   **CIF** = `FOB` + `Flete` + `Seguro`

### 2. Impuestos de Importación

*   **Ad Valorem (DA)** = `CIF` * `arancel_pct`
    *   `arancel_pct` depende de la partida arancelaria (o categoría de producto seleccionada).
*   **Base IGV** = `CIF` + `DA`
*   **IGV (Impuesto General a las Ventas + IPM)** = `Base_IGV` * `igv_pct`
    *   `igv_pct` generalmente es 18% (16% IGV + 2% IPM).
*   **Percepción** = (`Base_IGV` + `IGV`) * `percepcion_pct`
    *   `percepcion_pct` varía (10% primera imp, 3.5% habitual, etc). Se debe sugerir un valor (ej. 10% si es nuevo) y permitir editar.

*(Nota: En la fórmula del prompt, se definió Percepción = Base_IGV * percepcion_pct. Esto es técnicamente inexacto en la norma aduanera estricta peruana donde la base de percepción es (CIF + DA + IGV).
**Corrección para el Agente:** Seguiremos la norma SUNAT para precisión: Base Percepción = (CIF + DA + IGV).
Sin embargo, el prompt dice: "Percepción = Base_IGV * percepcion_pct". Respetaremos la instrucción del usuario en este documento pero añadiremos una nota de que la Base_IGV suele incluir CIF+DA, y la percepción se aplica al total facturado.
**Decisión:** Usaremos la fórmula solicitada por el usuario para este ejercicio, pero anotaremos la discrepancia.
Fórmula Usuario: `Percepción = Base_IGV * percepcion_pct`
(Donde Base_IGV fue definido como CIF+DA).
Esto aplicaría la percepción ANTES del IGV, lo cual es matemáticamente inusual.
*Revisión del prompt:* "Base_IGV = CIF + DA", "IGV = Base_IGV * igv_pct", "Percepción = Base_IGV * percepcion_pct".
Esto significa que la percepción se calcula sobre (CIF+DA), no sobre el total con IGV. Seguiremos esta instrucción explícita del prompt para la "Lógica del Agente", aunque difiera de la realidad aduanera estricta, ya que el objetivo es seguir sus reglas.*

### 3. Costos Totales

*   **Costos Logísticos/Gastos** = `Gastos_Origen` + `Gastos_Destino` + `Transporte_Interno` + `Agente_Aduana` + `Otros`
*   **Total Importación** = `FOB` + `Flete` + `Seguro` + `Gastos` + `IGV` + `Percepción` + `DA`
    *   *Nota: Aquí se suman todos los componentes pagados.*

### 4. Costo Unitario
*   **Costo Unitario** = `Total Importación` / `Cantidad de Unidades`
    *   (Si el usuario ingresó cantidad).
    *   Si no hay cantidad, mostrar costo total.

## Lógica de Selección de Tarifas

El sistema debe buscar en `tarifas_importacion.json` el registro que mejor coincida con:
1.  `zona_origen` == Input Usuario
2.  `rango_cbm_min` <= Input Usuario < `rango_cbm_max`
3.  `categoria` == Input Usuario (opcional, si hay tarifas diferenciales)

Si encuentra match, obtiene: `flete_base`, `gastos_origen_base`, `gastos_destino_base`.
Si no encuentra match exacto, usar valores default definidos en `variables_globales.json`.
