# Flujo de Trabajo: Calculadora de Costos de Importación

## Etapa 1: Recopilación de Datos Simples
Solicitar al usuario los siguientes datos mediante un formulario sencillo:

1.  **Categoría del producto** (Seleccionar de una lista predefinida).
2.  **Valor FOB total estimado** (En USD).
3.  **Volumen (CBM) o Tamaño aproximado**.
    *   Si el usuario no conoce el CBM exacto, ofrecer:
        *   Pequeño (0–1 CBM)
        *   Mediano (1–3 CBM)
        *   Grande (>3 CBM)
4.  **Zona de origen en China**.
5.  **Ciudad destino en Perú**.

## Etapa 2: Cálculo Inicial y Selección de Tarifas
El sistema ejecuta internamente los siguientes pasos:

1.  **Selección de Tarifas:**
    *   Consultar `tarifas_importacion.json`.
    *   Filtrar por Zona Origen, Rango CBM, Categoría y Rango FOB.
    *   Obtener costos base de Flete, Gastos en Origen, Gastos en Destino, etc.
2.  **Ejecución del Algoritmo de Cálculo:**
    *   Aplicar las fórmulas definidas en `03-rules.md` para obtener Seguro, CIF, impuestos (IGV, IPM, Percepción) y total.

## Etapa 3: Presentación de Resultados
Mostrar al usuario de forma clara:
*   **Costo Total de Importación:** (Soles y Dólares).
*   **Costo Unitario:** Fundamental para la toma de decisiones.
*   **Desglose de Conceptos:** Tabla resumen con los valores usados (Flete, Seguro, Impuestos, Gastos).
*   **Advertencias:** Si se usaron valores por defecto críticos o si falta información.

## Etapa 4: Modo "Jugar con los Números" (Simulación)
Habilitar una interfaz interactiva donde el usuario pueda modificar cualquiera de las variables estimadas:
*   Valor FOB
*   Costo de Flete
*   Gastos en destino/origen
*   Transporte interno
*   Porcentajes de impuestos (Arancel, Percepción)
*   Tipo de Cambio

**Comportamiento Dinámico:**
*   Al modificar un valor, el sistema recalcula **instantáneamente** el Costo Total y Unitario.
*   Botones de acción:
    *   "Restablecer valores sugeridos" (Vuelve al cálculo inicial).
    *   "Crear nuevo escenario" (Permite guardar variantes).
    *   "Comparar escenarios" (Visualización lado a lado).
