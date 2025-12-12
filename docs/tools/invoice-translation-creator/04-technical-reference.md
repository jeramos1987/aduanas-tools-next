# Referencia Técnica

> [!NOTE]
> Esta sección se detallará durante la implementación técnica de la herramienta.

## Estructura de Datos (Propuesta preliminar)

```typescript
interface InvoiceItem {
  itemNumber: number;
  invoiceDescription: string;
  category: 'General'; // Extensible
  productCode?: string;
  commercialName: string;
  brand: string;
  model: string;
  isRestricted: 'YES' | 'NO' | 'UNKNOWN';
  sanitaryRegistry?: string;
  condition: 'NEW' | 'USED';
  commercialUnitType: string; // SUNAT Code
  setQuantity?: number;
  originCountry: string; // ISO Code
  characteristics: string;
  usageOrFunction: string;
  material: string;
  observations?: string;
}
```
