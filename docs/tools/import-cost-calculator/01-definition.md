# Definición: Calculadora de Costos de Importación

## Objetivo Principal
El objetivo es proporcionar una estimación clara y realista del costo total de importar mercancías desde China hacia Perú. La herramienta está diseñada para usuarios que no necesariamente conocen la terminología aduanera técnica (CIF, DA, IGV, etc.), pero necesitan conocer el costo total puesto en Perú y el costo unitario de su mercancía.

El sistema utiliza un modelo híbrido:
1.  **Tarifario interno:** Administrado por el dueño del sistema (actualizado semanalmente).
2.  **Reglas de negocio y lógica:** Definidas en este conjunto de documentos y archivos de configuración.
3.  **Flexibilidad:** Permite al usuario ajustar valores ("jugar con los números") para ver cómo afectan el costo final.

## Alcance
La herramienta toma datos simples del usuario (FOB, Categoría, CBM/Tamaño, Origen, Destino) y calcula:
*   Flete internacional
*   Gastos en origen y destino
*   Seguro
*   Derechos Arancelarios (DA)
*   IGV
*   Percepción
*   Servicios logísticos locales
*   **Costo Total Puesto en Perú**
*   **Costo Unitario**

## Comportamiento General del Agente

1.  **Lenguaje:** Sencillo, profesional y amigable. Evitar tecnicismos innecesarios en la interacción, aunque el desglose final debe ser completo.
2.  **Datos de Entrada:** Minimizar la fricción. Solo pedir:
    *   Categoría de producto
    *   FOB estimado (valor de la mercancía)
    *   CBM estimado o tamaño (pequeño/mediano/grande)
    *   Zona de origen (China)
    *   Ciudad destino (Perú)
3.  **Fuentes de Datos:**
    *   NUNCA inventar tarifas.
    *   Usar estrictamente `tarifas_importacion.json`, `categorias_producto.json`, `variables_globales.json`.
4.  **Lógica de Edición:** "Valor Efectivo = Override del Usuario ?? Valor Sugerido". Si el usuario cambia un dato, se recalculan todos los dependientes.
5.  **Separación de Responsabilidades:**
    *   Reglas: Definidas en documentos MD.
    *   Datos: Definidos en JSON.
    *   Ejecución: Código funcional de la herramienta.

## Lo que NO debe hacer el Agente
*   ❌ Solicitar valores técnicos como DA, CIF, IGV o tasa de percepción directamente al usuario en la primera etapa.
*   ❌ Usar tarifas o costos inventados o "aproximados" fuera del dataset.
*   ❌ Confundir al usuario con jerga aduanera sin explicación.
*   ❌ Proporcionar valores oficiales de SUNAT que no estén en el dataset interno.
*   ❌ Modificar la lógica de cálculo definida en los documentos de Reglas.
