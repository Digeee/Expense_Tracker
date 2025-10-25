# Expense Tracker

A beautiful, responsive expense tracking application built with React, TypeScript, and Tailwind CSS. Track your expenses, visualize spending patterns, and manage your budget with ease.

## Features

- **Add, Edit, Delete Expenses**: Full CRUD functionality for managing your expenses
- **Category Management**: Predefined categories (Food, Transport, Bills, Shopping, Leisure, Other) with ability to add custom categories
- **Dashboard**: View monthly totals, category breakdown, and spending trends
- **Filtering**: Filter expenses by date range and category
- **Data Visualization**: Charts for category breakdown and monthly trends
- **Responsive Design**: Works beautifully on mobile and desktop
- **Local Storage**: All data persists between sessions
- **Animations**: Smooth animations for a delightful user experience
- **Accessibility**: Fully accessible with keyboard navigation and proper labeling

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces and types
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Guided Tour

### Key Components

1. **ExpenseTracker** (`src/components/ExpenseTracker.tsx`): The main application component that orchestrates all functionality
2. **Header** (`src/components/Header.tsx`): Top navigation with "Add Expense" button
3. **StatsCards** (`src/components/StatsCards.tsx`): Dashboard cards showing expense summaries
4. **ExpenseList** (`src/components/ExpenseList.tsx`): Displays list of expenses with animations
5. **ExpenseItem** (`src/components/ExpenseItem.tsx`): Individual expense item with edit/delete actions
6. **ExpenseFormModal** (`src/components/ExpenseFormModal.tsx`): Modal form for adding/editing expenses
7. **Filters** (`src/components/Filters.tsx`): Filtering controls for expenses
8. **Charts** (`src/components/Charts.tsx`): Data visualization components
9. **WelcomeBanner** (`src/components/WelcomeBanner.tsx`): Onboarding banner for new users

### Custom Hooks

1. **useExpenses** (`src/hooks/useExpenses.ts`): Manages expense data and CRUD operations
2. **useLocalStorage** (`src/hooks/useLocalStorage.ts`): Persists data to localStorage

### Utilities

1. **Currency** (`src/utils/currency.ts`): Formatting and parsing currency values
2. **Date** (`src/utils/date.ts`): Date formatting and manipulation

## Configuration

### Changing Currency

To change the default currency, modify the `DEFAULT_CURRENCY` constant in `src/utils/currency.ts`.

### Adding Categories

To add predefined categories, modify the `categories` array in `src/hooks/useExpenses.ts`.

### Seed Data

The application comes with sample expenses preloaded. To disable this, modify the `DEFAULT_EXPENSES` array in `src/hooks/useExpenses.ts`.

## Architecture Explanation

This application follows a component-based architecture with clear separation of concerns:

- **Components** handle UI rendering and user interactions
- **Hooks** manage state and business logic
- **Utilities** provide helper functions for common tasks
- **Types** ensure type safety throughout the application

The use of localStorage for data persistence makes this a fully functional offline application. Framer Motion provides smooth animations, and Recharts delivers beautiful data visualizations.

## Testing

To run tests:

```bash
npm run test
```

## Dependencies

- **React** + **TypeScript**: For building the user interface
- **Tailwind CSS**: For styling
- **Framer Motion**: For animations
- **Lucide React**: For icons
- **Recharts**: For data visualization
- **Vite**: For fast development and building

## Browser Support

This application works in all modern browsers that support ES6+ JavaScript.