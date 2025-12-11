# Development Workflows

This document outlines common development workflows and procedures for the Aduanas Tools project.

## Table of Contents
- [Initial Setup](#initial-setup)
- [Daily Development](#daily-development)
- [Adding a New Tool](#adding-a-new-tool)
- [Adding a New Component](#adding-a-new-component)
- [Adding Business Logic](#adding-business-logic)
- [Debugging](#debugging)
- [Deployment](#deployment)

---

## Initial Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- Code editor (VS Code recommended)

### First Time Setup
```bash
# Clone the repository
git clone <repository-url>
cd aduanas-tools

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

---

## Daily Development

### Starting Work
```bash
# Pull latest changes
git pull origin main

# Create a new feature branch
git checkout -b feature/your-feature-name

# Install any new dependencies
npm install

# Start development server
npm run dev
```

### During Development
1. Make changes to code
2. Save files (Next.js will auto-reload)
3. Test in browser at http://localhost:3000
4. Check console for errors
5. Verify TypeScript types are correct

### Committing Changes
```bash
# Check what files changed
git status

# Add files to commit
git add .

# Commit with descriptive message
git commit -m "feat: add new feature description"

# Push to remote
git push origin feature/your-feature-name
```

---

## Adding a New Tool

Follow these steps to add a new tool to the platform:

### 1. Plan the Tool
- Define what the tool does
- Identify required inputs and outputs
- Sketch the UI layout
- Determine business logic needed

### 2. Update Tool Configuration
Edit `src/config/tools.ts`:
```typescript
{
  id: "new-tool",
  title: "New Tool Name",
  description: "What this tool does",
  icon: "🔧",
  href: "/new-tool",
  available: false, // Set to true when ready
}
```

### 3. Create Domain Types
Create `src/domain/new-tool/types.ts`:
```typescript
/**
 * Input type for the new tool
 */
export type NewToolInput = {
  // Define input fields
  field1: string;
  field2: number;
};

/**
 * Result type for the new tool
 */
export type NewToolResult = {
  // Define output fields
  result1: number;
  result2: string;
};
```

### 4. Implement Business Logic
Create `src/domain/new-tool/logic.ts`:
```typescript
import type { NewToolInput, NewToolResult } from "./types";

/**
 * Main calculation function
 */
export function calculateNewTool(input: NewToolInput): NewToolResult {
  // Implement business logic
  return {
    result1: 0,
    result2: "",
  };
}
```

### 5. Create Custom Hook
Create `src/features/new-tool/hooks/useNewTool.ts`:
```typescript
import { useState } from "react";
import { calculateNewTool } from "@/domain/new-tool/logic";
import type { NewToolInput, NewToolResult } from "@/domain/new-tool/types";

export function useNewTool() {
  const [input, setInput] = useState<NewToolInput>({
    field1: "",
    field2: 0,
  });
  const [result, setResult] = useState<NewToolResult | null>(null);

  const calculate = () => {
    const calculatedResult = calculateNewTool(input);
    setResult(calculatedResult);
  };

  return {
    input,
    setInput,
    result,
    calculate,
  };
}
```

### 6. Create Feature Components
Create `src/features/new-tool/components/NewToolForm.tsx`:
```typescript
"use client";

import { useNewTool } from "../hooks/useNewTool";

export default function NewToolForm() {
  const { input, setInput, result, calculate } = useNewTool();

  return (
    <div>
      {/* Form inputs */}
      {/* Results display */}
    </div>
  );
}
```

### 7. Create Page
Create `src/app/(tools)/new-tool/page.tsx`:
```typescript
import NewToolForm from "@/features/new-tool/components/NewToolForm";

export default function NewToolPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">New Tool Name</h1>
      <NewToolForm />
    </div>
  );
}
```

### 8. Update Tool Availability
Once the tool is complete and tested, update `src/config/tools.ts`:
```typescript
{
  id: "new-tool",
  // ...
  available: true, // Change to true
}
```

### 9. Test
- Test all inputs and edge cases
- Verify calculations are correct
- Check responsive design
- Test error handling

---

## Adding a New Component

### UI Components
For generic, reusable UI components:

1. Create file in `src/components/ui/ComponentName.tsx`
2. Define props interface
3. Implement component
4. Export as named export

```typescript
// src/components/ui/Button.tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} className={/* styles */}>
      {children}
    </button>
  );
}
```

### Layout Components
For layout-specific components:

1. Create file in `src/components/layout/ComponentName.tsx`
2. Follow same pattern as UI components

### Feature Components
For feature-specific components:

1. Create file in `src/features/[feature-name]/components/ComponentName.tsx`
2. Keep component close to where it's used

---

## Adding Business Logic

### Domain Functions
Business logic should live in the `src/domain/` directory:

1. **Identify the domain**: customs, shipping, currency, etc.
2. **Create types**: Define input and output types
3. **Implement logic**: Write pure functions
4. **Document**: Add JSDoc comments with examples
5. **Test**: Verify calculations are correct

### Example Structure
```
src/domain/customs/
├── types.ts          # Type definitions
├── value.ts          # CIF value calculations
├── taxes.ts          # Tax calculations
└── validators.ts     # Input validation
```

### Best Practices
- **Pure functions**: No side effects, same input = same output
- **Type safety**: Strong typing for all parameters and returns
- **Documentation**: Explain formulas and business rules
- **Examples**: Include calculation examples in comments
- **Validation**: Validate inputs before calculations

---

## Debugging

### Common Issues

#### TypeScript Errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix import paths
# Ensure all imports use correct paths and types
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run dev
```

#### Runtime Errors
1. Check browser console for errors
2. Add console.log statements
3. Use React DevTools to inspect component state
4. Check Network tab for API issues

### Development Tools
- **React DevTools**: Inspect component hierarchy and state
- **Browser DevTools**: Debug JavaScript and inspect DOM
- **TypeScript**: Catch type errors at compile time
- **ESLint**: Catch code quality issues

---

## Deployment

### Build for Production
```bash
# Create production build
npm run build

# Test production build locally
npm start
```

### Pre-Deployment Checklist
- [ ] All TypeScript errors resolved
- [ ] All features tested in browser
- [ ] Responsive design verified on mobile
- [ ] No console errors or warnings
- [ ] Performance is acceptable
- [ ] SEO meta tags are set
- [ ] Environment variables configured

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Other Platforms
- **Netlify**: Connect GitHub repo and auto-deploy
- **AWS Amplify**: Deploy Next.js apps
- **Custom Server**: Build and deploy to your own server

---

## Maintenance Workflows

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

### Code Quality
```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Documentation Updates
When making significant changes:
1. Update relevant documentation in `docs/`
2. Update README if setup process changes
3. Update code comments and JSDoc
4. Update business rules if calculations change

---

## Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Project Documentation
- `docs/goals.md` - Project vision and objectives
- `docs/rules.md` - Development guidelines
- `docs/business-rules.md` - Domain-specific business logic
- `README.md` - Quick start guide
