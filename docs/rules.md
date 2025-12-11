# Development Rules and Guidelines

## Code Organization

### Project Structure
```
aduanas-tools/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Generic UI components (buttons, cards, etc.)
│   │   └── layout/      # Layout components (navbar, footer, etc.)
│   ├── features/        # Feature-specific modules
│   │   └── calculator/  # Calculator feature with hooks and components
│   ├── domain/          # Business logic and domain models
│   │   └── customs/     # Customs-specific business logic
│   ├── config/          # Configuration files
│   └── shared/          # Shared utilities and types
├── docs/                # Project documentation
└── public/              # Static assets
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `ToolCard.tsx`, `Navbar.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useCalculator.ts`)
- **Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **Types**: PascalCase (e.g., `CustomsInput`, `Tool`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_IGV_RATE`)

## Coding Standards

### TypeScript
- **Always use TypeScript**: No `.js` or `.jsx` files in the codebase
- **Explicit types**: Define types for all function parameters and return values
- **Type exports**: Export types from domain modules for reuse
- **Avoid `any`**: Use specific types or `unknown` when type is truly unknown
- **Use type over interface**: Prefer `type` for consistency unless extending is needed

### React Components
- **Functional components only**: No class components
- **Custom hooks**: Extract complex logic into custom hooks
- **Props typing**: Always type component props explicitly
- **Default exports**: Use default exports for page components
- **Named exports**: Use named exports for reusable components

### Code Documentation
- **JSDoc comments**: Add JSDoc comments for all exported functions and types
- **Explain the why**: Comments should explain why, not what (code shows what)
- **Examples**: Include examples in JSDoc for complex functions
- **Spanish for domain**: Use Spanish for domain-specific terms (e.g., "Valor en Aduana")
- **English for code**: Use English for variable names and code comments

### Example:
```typescript
/**
 * calculateCustomsTaxes - Calcula todos los impuestos de una importación
 * 
 * @param input - Datos de la importación (FOB, flete, seguro, tasas, etc.)
 * @returns Objeto con todos los valores calculados desglosados
 */
export function calculateCustomsTaxes(input: CustomsInput): CustomsResult {
  // Implementation
}
```

## Architecture Principles

### Separation of Concerns
1. **Domain Layer** (`src/domain/`): Pure business logic, no UI dependencies
2. **Feature Layer** (`src/features/`): Feature-specific components and hooks
3. **Component Layer** (`src/components/`): Reusable UI components
4. **App Layer** (`src/app/`): Next.js pages and routing

### Domain-Driven Design
- **Pure functions**: Domain functions should be pure (no side effects)
- **Type safety**: Strong typing for all domain models
- **Business rules**: Encode business rules in domain layer, not UI
- **Testability**: Domain logic should be easily testable

### Component Design
- **Single Responsibility**: Each component should do one thing well
- **Composition**: Build complex UIs from simple, composable components
- **Props over state**: Prefer props for data flow when possible
- **Custom hooks**: Extract stateful logic into custom hooks

## Styling Guidelines

### CSS Approach
- **Tailwind CSS**: Use Tailwind utility classes for styling
- **Component styles**: Keep styles close to components
- **Design tokens**: Use consistent colors, spacing, and typography
- **Responsive design**: Mobile-first approach with responsive utilities
- **Dark mode ready**: Consider dark mode in color choices

### Design System
- **Consistent spacing**: Use Tailwind spacing scale (4px base)
- **Color palette**: Define and use consistent color palette
- **Typography**: Use consistent font sizes and weights
- **Animations**: Subtle, purposeful animations for better UX

## State Management

### Local State
- **useState**: For simple component state
- **useReducer**: For complex state logic
- **Custom hooks**: For reusable stateful logic

### Form State
- **Controlled components**: Use controlled inputs for forms
- **Validation**: Validate on blur and submit
- **Error handling**: Show clear, helpful error messages

## Error Handling

### User-Facing Errors
- **Clear messages**: Use plain language, avoid technical jargon
- **Actionable**: Tell users what they can do to fix the error
- **Validation**: Validate inputs early and show inline errors
- **Fallbacks**: Provide sensible defaults and fallback values

### Developer Errors
- **Console errors**: Log errors to console in development
- **Type safety**: Use TypeScript to catch errors at compile time
- **Defensive coding**: Check for null/undefined before using values

## Performance

### Optimization
- **Code splitting**: Use dynamic imports for large features
- **Lazy loading**: Lazy load components not needed on initial render
- **Memoization**: Use `useMemo` and `useCallback` judiciously
- **Image optimization**: Use Next.js Image component for images

### Best Practices
- **Avoid premature optimization**: Optimize when needed, not before
- **Measure first**: Use profiling tools to identify bottlenecks
- **Bundle size**: Monitor and minimize bundle size

## Testing

### Testing Strategy
- **Unit tests**: Test domain logic and utilities
- **Component tests**: Test component behavior and rendering
- **Integration tests**: Test feature workflows
- **Manual testing**: Test in browser for UI/UX validation

### Test Coverage
- **Domain logic**: 100% coverage for business logic
- **Critical paths**: High coverage for critical user flows
- **Edge cases**: Test edge cases and error conditions

## Git Workflow

### Commit Messages
- **Conventional commits**: Use conventional commit format
- **Clear and concise**: Describe what and why, not how
- **Spanish or English**: Either language is acceptable

### Examples:
```
feat: add tariff search functionality
fix: correct IGV calculation for edge cases
docs: update business rules documentation
refactor: extract customs calculation logic
```

### Branching
- **Feature branches**: Create branches for new features
- **Descriptive names**: Use descriptive branch names
- **Small PRs**: Keep pull requests focused and reviewable

## Security

### Data Handling
- **No sensitive data**: Don't store sensitive user data without encryption
- **Input validation**: Always validate and sanitize user inputs
- **XSS prevention**: Use React's built-in XSS protection
- **HTTPS only**: Ensure all production traffic uses HTTPS

## Accessibility

### WCAG Compliance
- **Semantic HTML**: Use proper HTML elements
- **ARIA labels**: Add ARIA labels where needed
- **Keyboard navigation**: Ensure all features work with keyboard
- **Color contrast**: Maintain sufficient color contrast ratios
- **Screen readers**: Test with screen readers

## Documentation

### Code Documentation
- **README**: Keep README up to date with setup instructions
- **JSDoc**: Document all exported functions and types
- **Inline comments**: Explain complex logic and business rules
- **Examples**: Provide usage examples for complex features

### Project Documentation
- **Goals**: Document project vision and objectives
- **Rules**: Maintain development guidelines (this file)
- **Workflows**: Document common development workflows
- **Business rules**: Document domain-specific business logic

## Adding New Features

### Checklist
1. ✅ Define types in `src/domain/`
2. ✅ Implement business logic in `src/domain/`
3. ✅ Create feature components in `src/features/`
4. ✅ Add page in `src/app/`
5. ✅ Update `src/config/tools.ts`
6. ✅ Add documentation
7. ✅ Test functionality
8. ✅ Update README if needed

### Tool Configuration
When adding a new tool, update `src/config/tools.ts`:
```typescript
{
  id: "tool-id",
  title: "Tool Name",
  description: "Brief description",
  icon: "🔧",
  href: "/tool-route",
  available: true, // or false if in development
}
```
