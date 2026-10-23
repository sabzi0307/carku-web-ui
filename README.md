# React TypeScript Dashboard

A modern, responsive dashboard built with React, TypeScript, Vite, and shadcn/ui with bilingual support (English/Persian).

## Features

- ✅ **Modern Stack**: React 18 + TypeScript + Vite
- ✅ **UI Library**: shadcn/ui components with Tailwind CSS
- ✅ **Bilingual Support**: English and Persian (RTL)
- ✅ **Theme Switching**: Light and Dark modes
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Authentication**: Login system with JWT simulation
- ✅ **State Management**: Zustand for global state
- ✅ **Customer Management**: Full CRUD operations
- ✅ **Form Validation**: React Hook Form with validation
- ✅ **Animations**: Smooth transitions and hover effects

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Required Dependencies

```bash
# Core dependencies
npm install react-router-dom zustand react-hook-form @hookform/resolvers zod
npm install date-fns date-fns-jalali lucide-react class-variance-authority clsx tailwind-merge

# Radix UI components (for shadcn/ui)
npm install @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-button
npm install @radix-ui/react-card @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-form @radix-ui/react-icons @radix-ui/react-input
npm install @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select
npm install @radix-ui/react-separator @radix-ui/react-sheet @radix-ui/react-switch
npm install @radix-ui/react-table @radix-ui/react-tabs @radix-ui/react-toast
npm install @radix-ui/react-tooltip
```

### 3. Setup Tailwind CSS

Create `postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. Run Development Server

```bash
npm run dev
```

## Project Structure

```
/src
├── /api/                 # API integration functions
├── /assets/              # Static assets
├── /components/          # Reusable UI components
│   ├── /common/          # Common components
│   ├── /layout/          # Layout components
│   ├── /customers/       # Customer-specific components
│   └── /ui/              # shadcn/ui components
├── /hooks/               # Custom React hooks
├── /pages/               # Page components (Routes)
├── /store/               # Zustand state stores
├── /styles/              # Global styles and themes
├── /types/               # TypeScript interfaces
├── /utils/               # Utility functions
├── App.tsx               # Main app component and routing
└── main.tsx              # Application entry point
```

## Usage

### Default Login Credentials

- **Username**: Any username
- **Password**: Any password

The authentication is currently mocked for demonstration purposes.

### Features Overview

1. **Dashboard**: Overview cards with statistics and recent activity
2. **Customer Management**: 
   - List all customers with search and filters
   - Add new customers with form validation
   - Edit existing customer information
   - View detailed customer information
   - Delete customers with confirmation
3. **Theme & Language**: 
   - Switch between light/dark themes
   - Toggle between English and Persian (with RTL support)
4. **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
5. **Settings Page**: Configure appearance and language preferences

### Customer Management Features

The customer section includes full CRUD operations based on the provided CustomerDto class:

- **List View**: Paginated table with search functionality
- **Create**: Add new customers with form validation
- **Read**: View detailed customer information in modal
- **Update**: Edit existing customer data
- **Delete**: Remove customers with confirmation dialog

### Supported Customer Fields

- ID (auto-generated)
- First Name and Last Name
- Full Name (auto-generated)
- Phone Number and Mobile Number
- Customer Number (auto-generated)
- National Code (with validation)
- Create Date (auto-generated)
- City
- Description

## Customization

### Adding New Pages

1. Create a new page component in `/src/pages/`
2. Add the route to `/src/App.tsx`
3. Add navigation item to `/src/components/layout/Sidebar.tsx`
4. Update translations in `/src/utils/translations.ts`

### Adding New Languages

1. Add language translations to `/src/utils/translations.ts`
2. Update the `Language` type in `/src/store/appStore.ts`
3. Add language option to settings page

### Customizing Theme

1. Update CSS variables in `/src/styles/globals.css`
2. Modify Tailwind config in `tailwind.config.js`
3. Add new theme variants in the theme toggle logic

## API Integration

Currently, the application uses mock data. To integrate with a real API:

1. Replace mock functions in stores with actual API calls
2. Update the API functions in `/src/api/` directory
3. Handle loading states and error messages appropriately

### Customer API Example

```typescript
// src/api/customers.ts
export const customerApi = {
  getCustomers: async (filters: CustomerFilters) => {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    return response.json();
  },
  
  createCustomer: async (customer: CustomerFormData) => {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
    return response.json();
  },
  
  // ... other CRUD operations
};
```

## Performance Optimizations

- Lazy loading of pages with React.lazy()
- Memoization of expensive calculations
- Optimized re-renders with proper dependency arrays
- Image optimization and lazy loading
- Bundle splitting with Vite

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.

## Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

---

**Note**: This is a demonstration project with mock data. For production use, integrate with your actual backend API and implement proper authentication and authorization.