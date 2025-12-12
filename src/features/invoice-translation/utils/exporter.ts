import * as XLSX from 'xlsx';
import { InvoiceItem } from '../types';

export const exportToExcel = (items: InvoiceItem[]) => {
    if (items.length === 0) {
        alert('No hay ítems para exportar.'); // Simple alert for now, could be better UI feedback
        return;
    }

    // Map items to the format required for the Excel file (columns)
    const data = items.map((item) => ({
        'Nro Item': item.itemNumber,
        'Descripción Factura': item.invoiceDescription,
        'Categoría': item.category,
        'Código Producto': item.productCode || '',
        'Nombre Comercial': item.commercialName,
        'Marca': item.brand,
        'Modelo': item.model,
        'Restringido': item.isRestricted,
        'Registro Sanitario': item.sanitaryRegistry || (item.isRestricted === 'NO' ? 'NO' : 'DESCONOZCO'),
        'Estado': item.condition,
        'Uni. Comercial': item.commercialUnitType,
        'Cant. Set': item.commercialUnitType === 'SET' ? item.setQuantity : '',
        'País Origen': item.originCountry,
        'Características': item.characteristics,
        'Uso/Función': item.usageOrFunction,
        'Material': item.material,
        'Observaciones': item.observations || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Traducción Factura');

    // Auto-width columns (basic heuristic)
    const max_width = data.reduce((w, r) => Math.max(w, r['Descripción Factura'].length), 10);
    worksheet['!cols'] = [
        { wch: 8 },  // Nro
        { wch: 40 }, // Desc
        { wch: 15 }, // Cat
        { wch: 15 }, // Cod
        { wch: 20 }, // Nom Com
        { wch: 15 }, // Marca
        { wch: 15 }, // Mod
        { wch: 10 }, // Rest
        { wch: 15 }, // Reg San
        { wch: 10 }, // Estado
        { wch: 10 }, // Uni
        { wch: 10 }, // Cant Set
        { wch: 15 }, // Pais
        { wch: 30 }, // Carac
        { wch: 30 }, // Uso
        { wch: 30 }, // Mat
        { wch: 20 }, // Obs
    ];

    XLSX.writeFile(workbook, 'Traduccion_Factura.xlsx');
};
