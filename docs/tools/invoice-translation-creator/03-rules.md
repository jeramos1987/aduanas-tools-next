# Reglas y Especificaciones de Campos

## Campos del Formulario

Cada ítem de la factura debe contener la siguiente información. Se detallan las validaciones y ayudas para cada campo.

### 1. Nro de Item
- **Descripción**: Número correlativo ascendente.
- **Regla**: Debe seguir el orden de la factura comercial (1, 2, 3...).
- **Tipo de dato**: Numérico (Entero).
- **Obligatorio**: Sí.

### 2. Descripción Factura
- **Descripción**: Descripción literal del producto tal como aparece en la factura comercial.
- **Regla**: Permitir copiar y pegar. Sirve para diferenciar a qué ítem se refiere.
- **Tipo de dato**: Texto libre.
- **Obligatorio**: Sí.

### 3. Categoría
- **Descripción**: Clasificación del tipo de producto.
- **Opciones**:
  - `Carga General` (Por defecto para esta versión).
- **Nota**: Ciertos productos requieren descripciones mínimas diferentes.

### 4. Código Producto
- **Descripción**: Código asignado al producto en la factura.
- **Regla**: Opcional, algunas facturas no detallan código.
- **Tipo de dato**: Texto alfanumérico.
- **Obligatorio**: No.

### 5. Nombre Comercial
- **Descripción**: Nombre común del producto en el mercado.
- **Regla**: Debe estar en español.
- **Ejemplos**: "Mesa", "Mesa de billar", "Silla", "Teléfono inteligente".
- **Tipo de dato**: Texto.
- **Obligatorio**: Sí.

### 6. Marca
- **Descripción**: Marca comercial del producto.
- **Reglas**:
  - Solo ingresar si la marca está IMPRESA en el producto físico.
  - Si no tiene marca impresa, ingresar "SIN MARCA".
- **Tipo de dato**: Texto.
- **Obligatorio**: Sí.

### 7. Modelo
- **Descripción**: Modelo del producto.
- **Reglas**:
  - Solo ingresar si el número/código de modelo está IMPRESO en el producto.
  - Si no tiene modelo impreso, ingresar "SIN MODELO".
- **Tipo de dato**: Texto.
- **Obligatorio**: Sí.

### 8. Registro Sanitario
- **Lógica condicional**:
  1. Preguntar: "¿Es mercancía restringida?"
  2. Opciones:
     - **SÍ**: Habilitar campo para ingresar número de Registro Sanitario.
     - **NO**: Autocompletar campo con "NO".
     - **DESCONOZCO**: Autocompletar campo con "DESCONOZCO".
- **Obligatorio**: Sí (la selección).

### 9. Estado de Producto
- **Descripción**: Condición del producto.
- **Opciones**:
  - `Nuevo`
  - `Usado`
- **Obligatorio**: Sí.

### 10. Tipo de Unidad Comercial
- **Descripción**: Unidad de medida comercial según factura.
- **Regla**: Debe coincidir con la factura y usar opciones de la tabla SUNAT.
- **Fuente de datos**: Tabla de Unidades de Medida SUNAT.
- **Obligatorio**: Sí.

### 11. Cantidad Set
- **Descripción**: Cantidad de piezas en el set.
- **Regla**: Solo habilitar/mostrar si "Tipo de Unidad Comercial" es `SET`.
- **Tipo de dato**: Numérico.

### 12. País de Origen
- **Descripción**: País de fabricación del producto.
- **Regla**: No confundir con país de embarque.
- **Fuente de datos**: Lista de países.
- **Obligatorio**: Sí.

### 13. Características
- **Descripción**: Detalles específicos del producto.
- **Regla**: Si hay varios detalles, separar por comas.
- **Ejemplo**: "Mesa para cocina, color: negro".
- **Tipo de dato**: Texto largo.
- **Obligatorio**: Sí.

### 14. Uso o Función
- **Descripción**: Para qué sirve el producto.
- **Ejemplo**: "Repuesto para carro marca Kia modelo 345", "Mesa para estudiantes".
- **Tipo de dato**: Texto.
- **Obligatorio**: Sí.

### 15. Material
- **Descripción**: Material de composición.
- **Regla**: Si son varios, detallar porcentaje.
- **Ejemplo**: "Acero 80%, Madera 20%".
- **Tipo de dato**: Texto.
- **Obligatorio**: Sí.

### 16. Observaciones
- **Descripción**: Información adicional relevante.
- **Tipo de dato**: Texto libre.
- **Obligatorio**: No (Opcional).

## Exportación
- **Formato**: Excel (.xlsx).
- **Estructura**: Tabla con columnas correspondientes a los campos anteriores.
