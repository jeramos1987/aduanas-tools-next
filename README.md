# Aduanas Tools 🧮

A professional customs and international trade toolkit powered by **[AduanasPE.com](https://aduanaspe.com)**.

This platform provides essential tools for importers, exporters, and logistics professionals to simplify their operations and make informed decisions. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Overview

Aduanas Tools simplifies customs operations through intuitive, accurate, and professional tools that help importers, exporters, and logistics professionals:
- Calculate customs duties and taxes correctly
- Understand trade regulations and procedures
- Manage international shipping documentation
- Make informed decisions about international trade

## ✨ Features

### Available Tools
- **🧮 Customs Calculator**: Calculate CIF value, customs duties, and IGV for imports with detailed breakdowns

### Coming Soon
- 🔍 Tariff Search: Find correct tariff classifications and applicable rates
- 📦 Shipping Tracker: Track international shipments in real-time
- 📄 Document Generator: Generate commercial invoices and packing lists
- 📚 Incoterms Guide: Interactive guide to international trade terms
- 💱 Currency Converter: Real-time currency conversion for trade operations

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aduanas-tools

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
aduanas-tools/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (tools)/     # Tool pages (calculator, etc.)
│   │   └── page.tsx     # Home page
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Generic UI components
│   │   └── layout/      # Layout components (Navbar, Footer)
│   ├── features/        # Feature-specific modules
│   │   └── calculator/  # Calculator feature
│   ├── domain/          # Business logic and domain models
│   │   └── customs/     # Customs calculation logic
│   ├── config/          # Configuration files
│   └── shared/          # Shared utilities and types
├── docs/                # Project documentation
│   ├── goals.md         # Project vision and objectives
│   ├── rules.md         # Development guidelines
│   ├── workflows.md     # Development workflows
│   └── business-rules.md # Customs calculation rules
└── public/              # Static assets
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Goals](docs/goals.md)** - Project vision, objectives, and success criteria
- **[Development Rules](docs/rules.md)** - Coding standards and architectural principles
- **[Workflows](docs/workflows.md)** - Common development procedures and workflows
- **[Business Rules](docs/business-rules.md)** - Customs calculation formulas and regulations

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with Tailwind
- **Architecture**: Domain-Driven Design with feature-based organization

## 🏗️ Architecture

The project follows a **domain-driven design** approach:

- **Domain Layer** (`src/domain/`): Pure business logic, no UI dependencies
- **Feature Layer** (`src/features/`): Feature-specific components and hooks
- **Component Layer** (`src/components/`): Reusable UI components
- **App Layer** (`src/app/`): Next.js pages and routing

## 🧮 Customs Calculator

The customs calculator helps you calculate:
- **CIF Value** (Cost, Insurance, Freight): The customs value of your imports
- **Customs Duty**: Ad valorem tax based on product classification
- **IGV**: Peru's Value Added Tax (18%)
- **Total Taxes**: Complete tax breakdown for your import

### Calculation Formula

```
1. CIF Value = FOB + Freight + Insurance + Other Costs
2. Duty = CIF Value × Duty Rate
3. IGV Base = CIF Value + Duty
4. IGV = IGV Base × IGV Rate (18%)
5. Total Taxes = Duty + IGV
```

See [Business Rules](docs/business-rules.md) for detailed calculation logic.

## 🤝 Contributing

### Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes following the [Development Rules](docs/rules.md)
3. Test your changes thoroughly
4. Commit with descriptive messages: `git commit -m "feat: add new feature"`
5. Push and create a pull request

### Adding a New Tool

See the [Workflows Guide](docs/workflows.md#adding-a-new-tool) for step-by-step instructions.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [AduanasPE.com](https://aduanaspe.com)
- [SUNAT (Peru Tax Authority)](https://www.sunat.gob.pe)

## 📧 Support

For questions or issues, please refer to the documentation in the `docs/` folder or open an issue in the repository.
