import { useState, useEffect } from 'react';
import { InvoiceItem, INITIAL_ITEM, UNIT_TYPES } from '../types';

interface InvoiceFormProps {
    onSubmit: (item: Omit<InvoiceItem, 'id'>) => void;
    onCancel: () => void;
    initialData?: InvoiceItem;
    nextItemNumber: number;
}

export default function InvoiceForm({ onSubmit, onCancel, initialData, nextItemNumber }: InvoiceFormProps) {
    const [formData, setFormData] = useState<Omit<InvoiceItem, 'id'>>({
        ...INITIAL_ITEM,
        itemNumber: nextItemNumber,
    });

    useEffect(() => {
        if (initialData) {
            const { id, ...rest } = initialData;
            setFormData(rest);
        } else {
            setFormData(prev => ({ ...prev, itemNumber: nextItemNumber }));
        }
    }, [initialData, nextItemNumber]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        if (!initialData) {
            // Reset form for next item, incrementing number
            setFormData({
                ...INITIAL_ITEM,
                itemNumber: formData.itemNumber + 1
            });
        }
    };

    const isRestricted = formData.isRestricted === 'YES';
    const isSet = formData.commercialUnitType === 'SET';

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">
                {initialData ? 'Editar Ítem' : 'Agregar Nuevo Ítem'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Nro Item */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nro Item</label>
                    <input
                        type="number"
                        name="itemNumber"
                        value={formData.itemNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        required
                    />
                </div>

                {/* 2. Descripción Factura */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Descripción Factura (Inglés/Origen)</label>
                    <input
                        type="text"
                        name="invoiceDescription"
                        value={formData.invoiceDescription}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        placeholder="Ej: WIRELESS MOUSE M185"
                        required
                    />
                </div>

                {/* 3. Categoría */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                    >
                        <option value="Carga General">Carga General</option>
                    </select>
                </div>

                {/* 4. Código Producto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Código Producto (Opcional)</label>
                    <input
                        type="text"
                        name="productCode"
                        value={formData.productCode}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                    />
                </div>

                {/* 5. Nombre Comercial */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Comercial (Español)</label>
                    <input
                        type="text"
                        name="commercialName"
                        value={formData.commercialName}
                        onChange={handleChange}
                        placeholder="Ej: Mouse Inalámbrico"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        required
                    />
                </div>

                {/* 6. Marca */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Si no tiene, poner SIN MARCA"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                            required
                        />
                    </div>
                </div>

                {/* 7. Modelo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Modelo</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Si no tiene, poner SIN MODELO"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        required
                    />
                </div>

                {/* 8. Restringido & Registro Sanitario */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">¿Es Restringido?</label>
                        <select
                            name="isRestricted"
                            value={formData.isRestricted}
                            onChange={(e) => {
                                const val = e.target.value as any;
                                setFormData(prev => ({
                                    ...prev,
                                    isRestricted: val,
                                    sanitaryRegistry: val === 'YES' ? '' : (val === 'NO' ? 'NO' : 'DESCONOZCO')
                                }));
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        >
                            <option value="NO">NO</option>
                            <option value="YES">SI</option>
                            <option value="UNKNOWN">DESCONOZCO</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registro Sanitario</label>
                        <input
                            type="text"
                            name="sanitaryRegistry"
                            value={formData.sanitaryRegistry}
                            onChange={handleChange}
                            disabled={!isRestricted}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border ${!isRestricted ? 'bg-gray-100' : ''}`}
                            required
                        />
                    </div>
                </div>

                {/* 9. Estado */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                    >
                        <option value="NEW">Nuevo</option>
                        <option value="USED">Usado</option>
                    </select>
                </div>

                {/* 10. Tipo de Unidad */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Unidad Comercial</label>
                    <select
                        name="commercialUnitType"
                        value={formData.commercialUnitType}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                    >
                        {UNIT_TYPES.map(u => (
                            <option key={u.code} value={u.code}>{u.name} ({u.code})</option>
                        ))}
                    </select>
                </div>

                {/* 11. Cantidad Set */}
                {isSet && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cantidad por Set</label>
                        <input
                            type="number"
                            name="setQuantity"
                            value={formData.setQuantity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                            required={isSet}
                            min="1"
                        />
                    </div>
                )}

                {/* 12. País de Origen */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">País de Origen</label>
                    <input
                        type="text"
                        name="originCountry"
                        value={formData.originCountry}
                        onChange={handleChange}
                        placeholder="Ej: CHINA"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        required
                    />
                </div>

                {/* 13. Características */}
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Características (Separar por comas)</label>
                    <textarea
                        name="characteristics"
                        value={formData.characteristics}
                        onChange={handleChange}
                        rows={2}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        placeholder="Ej: Color: Negro, Voltaje: 220V, Material: Plástico"
                        required
                    />
                </div>

                {/* 14. Uso o Función */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Uso o Función</label>
                    <input
                        type="text"
                        name="usageOrFunction"
                        value={formData.usageOrFunction}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        required
                    />
                </div>

                {/* 15. Material */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Material (con %)</label>
                    <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="Ej: 80% Algodón, 20% Poliester"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                        required
                    />
                </div>

                {/* 16. Observaciones */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                    <input
                        type="text"
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
                {initialData && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        Cancelar Edición
                    </button>
                )}
                <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 shadow-md font-medium"
                >
                    {initialData ? 'Actualizar Ítem' : 'Agregar Ítem'}
                </button>
            </div>
        </form>
    );
}
