/**
 * ============================================================================
 * CONFIGURACIÓN DE HERRAMIENTAS
 * ============================================================================
 * Este archivo centraliza la información de todas las herramientas disponibles
 * en el centro de herramientas aduaneras. Facilita agregar nuevas herramientas
 * sin modificar múltiples archivos.
 */

/**
 * Tool - Representa una herramienta del centro
 */
export type Tool = {
    /** ID único de la herramienta */
    id: string;
    /** Nombre de la herramienta */
    title: string;
    /** Descripción breve de qué hace la herramienta */
    description: string;
    /** Emoji o icono representativo */
    icon: string;
    /** Ruta URL de la herramienta */
    href: string;
    /** Si la herramienta está disponible o en desarrollo */
    available: boolean;
};

/**
 * TOOLS - Array con todas las herramientas del centro
 * 
 * Para agregar una nueva herramienta:
 * 1. Agrega un nuevo objeto al array
 * 2. Crea la página correspondiente en src/app/(tools)/[nombre]
 * 3. La herramienta aparecerá automáticamente en la página principal
 */
export const TOOLS: Tool[] = [
    {
        id: "calculator",
        title: "Calculadora de Aduanas",
        description: "Calcula el valor en aduana (CIF), derechos arancelarios e IGV de tus importaciones de forma rápida y precisa.",
        icon: "🧮",
        href: "/calculator",
        available: true,
    },
    {
        id: "tariff-search",
        title: "Buscador de Partidas Arancelarias",
        description: "Encuentra la partida arancelaria correcta para tus productos y conoce las tasas aplicables.",
        icon: "🔍",
        href: "/tariff-search",
        available: false,
    },
    {
        id: "shipping-tracker",
        title: "Rastreador de Envíos",
        description: "Rastrea tus envíos internacionales y conoce el estado de tus importaciones en tiempo real.",
        icon: "📦",
        href: "/shipping-tracker",
        available: false,
    },
    {
        id: "document-generator",
        title: "Generador de Documentos",
        description: "Genera facturas comerciales, packing lists y otros documentos necesarios para importación.",
        icon: "📄",
        href: "/document-generator",
        available: false,
    },
    {
        id: "incoterms-guide",
        title: "Guía de Incoterms",
        description: "Consulta y compara los diferentes Incoterms para entender tus responsabilidades en cada operación.",
        icon: "📚",
        href: "/incoterms-guide",
        available: false,
    },
    {
        id: "currency-converter",
        title: "Conversor de Monedas",
        description: "Convierte entre diferentes monedas con tasas de cambio actualizadas para tus operaciones comerciales.",
        icon: "💱",
        href: "/currency-converter",
        available: false,
    },
];
