# Navegación del Proyecto

Este documento sirve como mapa para navegar por el código fuente y la documentación del proyecto **Aduanas Tools**.

## Estructura de Directorios

El proyecto sigue una estructura estándar de Next.js con una organización orientada al dominio (Domain-Driven Design simplificado).

### `src/` - Código Fuente

La lógica de la aplicación reside aquí.

*   **`src/app`**: Enrutamiento y páginas de la aplicación (Next.js App Router).
    *   `src/app/(tools)`: Grupo de rutas para herramientas específicas.
    *   `src/app/herramientas`: Páginas individuales de herramientas.
*   **`src/features`**: Módulos funcionales que encapsulan la lógica de negocio de cada herramienta.
    *   `calculator`: Calculadora básica (Legacy/Base).
    *   `customs-interest`: Calculadora de intereses aduaneros.
    *   `import-calculator`: Calculadora de costos de importación.
*   **`src/components`**: Componentes de UI reutilizables (Botones, Inputs, Cards, etc.).
*   **`src/domain`**: Definiciones de tipos, interfaces y lógica pura del dominio aduanero.
*   **`src/data`**: Archivos de datos estáticos (JSON) como tarifas y categorías.
*   **`src/config`**: Configuraciones globales del proyecto.

### `docs/` - Documentación

Documentación detallada del proyecto.

*   **`docs/project`**: Documentación sobre el proyecto en sí (este archivo, estructura, guías).
*   **`docs/tools`**: Documentación específica para cada herramienta (reglas de negocio, workflows).
    *   Ejemplo: `docs/tools/import-calculator/` contiene la definición y reglas de la calculadora de importaciones.
*   **`docs/domain`**: Conocimiento sobre el dominio de aduanas.

## Flujo de Trabajo Recomendado

1.  **Para entender una herramienta**: Comienza en `docs/tools/[nombre-herramienta]`. Lee la definición y workflow.
2.  **Para ver la implementación**: Ve a `src/features/[nombre-herramienta]`.
3.  **Para ver la página**: Ve a `src/app/herramientas/[nombre-herramienta]`.

## Convenciones

*   Los archivos Markdown en `docs` son la fuente de verdad para las reglas de negocio.
*   `src/features` debe contener la lógica, mientras que `src/app` solo debe encargarse del montaje de la página y el enrutamiento.
