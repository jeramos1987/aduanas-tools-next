"use client";

import { useState } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoiceTable from './InvoiceTable';
import { InvoiceItem } from '../types';
import { exportToExcel } from '../utils/exporter';

export default function InvoiceTranslationTool() {
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAddItem = (itemData: Omit<InvoiceItem, 'id'>) => {
        if (editingId) {
            setItems((prev) =>
                prev.map((item) => (item.id === editingId ? { ...itemData, id: editingId } : item))
            );
            setEditingId(null);
        } else {
            const newItem: InvoiceItem = {
                ...itemData,
                id: crypto.randomUUID(),
            };
            setItems((prev) => [...prev, newItem]);
        }
    };

    const handleEdit = (item: InvoiceItem) => {
        setEditingId(item.id);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Estás seguro de eliminar este ítem?')) {
            setItems((prev) => prev.filter((item) => item.id !== id));
            if (editingId === id) setEditingId(null);
        }
    };

    const handleExport = () => {
        exportToExcel(items);
    };

    const editingItem = items.find((item) => item.id === editingId);
    // Auto-calculate next item number: max + 1
    const nextItemNumber = items.length > 0 ? Math.max(...items.map(i => i.itemNumber)) + 1 : 1;

    return (
        <div className="space-y-8">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                <h2 className="text-lg font-semibold text-purple-800 mb-2">Instrucciones</h2>
                <p className="text-sm text-purple-700">
                    Agrega los ítems de tu factura comercial uno por uno. Asegúrate de copiar la descripción exacta de la factura y completar los datos comerciales requeridos. Al finalizar, exporta la tabla a Excel para enviarla a tu agente de aduanas.
                </p>
            </div>

            <InvoiceForm
                onSubmit={handleAddItem}
                onCancel={() => setEditingId(null)}
                initialData={editingItem}
                nextItemNumber={nextItemNumber}
            />

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        Ítems Registrados ({items.length})
                    </h3>
                    {items.length > 0 && (
                        <button
                            onClick={handleExport}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow-sm flex items-center gap-2"
                        >
                            <span>📊</span> Exportar a Excel
                        </button>
                    )}
                </div>
                <InvoiceTable
                    items={items}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
