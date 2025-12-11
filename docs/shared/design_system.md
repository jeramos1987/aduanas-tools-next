# Design System: Pastel Cheerful

## Overview
The application uses a "Pastel Cheerful" theme designed to be friendly, approachable, and modern. It moves away from traditional corporate blues or heavy dark modes in favor of soft gradients, light backgrounds, and playful yet professional accent colors.

## Color Palette

### Primary Colors
Used for main actions, active states, and headings.
- **Violet 400** (`#a78bfa`): Primary brand color. Friendly and creative.
- **Violet 500** (`#8b5cf6`): Hover states and deeper accents.
- **Violet Gradient** (`from-violet-500 to-fuchsia-500`): Used for the Header and primary call-to-action buttons.

### Secondary Colors
Used for success states, financial values, and supporting elements.
- **Mint 400** (`#34d399`) / **Emerald 500** (`#10b981`): Success, positive values, "safe" indicators.
- **Sky 400/500** (`#38bdf8` / `#0ea5e9`): Information, calm accents, "Customs Value".
- **Fuchsia 500** (`#d946ef`): playful accents, "Duty" highlight.
- **Orange 300/400** (`#fdba74` / `#f97316`): Warnings, "IGV" highlight.

### Neutral Colors
Used for backgrounds, text, and structure.
- **Slate 50** (`#f8fafc`): Main application background. Soft and clean.
- **White** (`#ffffff`): Card backgrounds and input fields.
- **Slate 600** (`#475569`): Body text. Softer than pure black.
- **Slate 800** (`#1e293b`): Headings and high-contrast text.

## UI Elements

### Gradients
- **Page Background**: `bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50`.
- **Header**: `bg-gradient-to-r from-violet-500 to-fuchsia-500`.
- **Primary Buttons/Cards**: `bg-gradient-to-r from-violet-500 to-fuchsia-500`.

### Cards
- **Style**: White background with rounded corners (`rounded-2xl` or `rounded-3xl`).
- **Shadow**: Soft, colored shadows to add depth without harshness (e.g., `shadow-xl shadow-indigo-100`).
- **Borders**: Subtle or transparent borders (`border-white` or `border-sky-50`).

### Typography
- **Font**: Inter (or Outfit if available).
- **Headings**: often use gradients or colorful text (`text-transparent bg-clip-text`).
- **Labels**: Bold, uppercase, tracking-wide for readability.

## Usage Guidelines
1.  **Keep it Light**: Avoid heavy dark blocks unless necessary for contrast (like the footer).
2.  **Soften the Edges**: Use rounded corners (`rounded-lg` minimum, often `rounded-2xl`).
3.  **Use Color for Meaning**: 
    - Sky = Base Value
    - Violet = Duty
    - Orange = Tax/IGV
    - Emerald = Perception/Credit
    - Gradient = Total/Action
