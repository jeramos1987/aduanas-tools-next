import InvoiceTranslationTool from '@/features/invoice-translation/components/InvoiceTranslationTool';

export default function InvoiceTranslationPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Creador de Traducción de Factura</h1>
                <p className="text-gray-600">
                    Herramienta para generar el formato de traducción de facturas de importación.
                </p>
            </div>

            <InvoiceTranslationTool />
        </div>
    );
}
