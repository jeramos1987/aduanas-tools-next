export interface InvoiceItem {
    id: string; // Unique ID for React keys and manipulation
    itemNumber: number;
    invoiceDescription: string;
    category: string;
    productCode?: string;
    commercialName: string;
    brand: string;
    model: string;
    isRestricted: 'YES' | 'NO' | 'UNKNOWN';
    sanitaryRegistry?: string;
    condition: 'NEW' | 'USED';
    commercialUnitType: string;
    setQuantity?: number;
    originCountry: string;
    characteristics: string;
    usageOrFunction: string;
    material: string;
    observations?: string;
}

export const INITIAL_ITEM: Omit<InvoiceItem, 'id' | 'itemNumber'> = {
    invoiceDescription: '',
    category: 'Carga General',
    productCode: '',
    commercialName: '',
    brand: 'SIN MARCA',
    model: 'SIN MODELO',
    isRestricted: 'NO',
    sanitaryRegistry: '',
    condition: 'NEW',
    commercialUnitType: 'U', // Default to Units key if possible, need verification
    setQuantity: 0,
    originCountry: '',
    characteristics: '',
    usageOrFunction: '',
    material: '',
    observations: '',
};

// SUNAT Unit Types (Simplified subset for now, typically this is a long list)
export const UNIT_TYPES = [
    { code: 'NIU', name: 'UNIDAD (BIENES)' },
    { code: 'KGM', name: 'KILOGRAMO' },
    { code: 'SET', name: 'JUEGO / SET' },
    { code: 'MTR', name: 'METRO' },
    { code: 'LTR', name: 'LITRO' },
    // Add more as needed
];
