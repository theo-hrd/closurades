# Les Closurades Festival

Website for Les Closurades Festival - a music festival in St-Georges-lès-Baillargeaux (86).

## Tech Stack

- Next.js 15 with Turbopack
- React 19
- TypeScript
- TailwindCSS
- Vercel Analytics
- Vercel Speed Insights

## Project Structure

The project follows Next.js App Router conventions with an optimized component structure:

```
src/
  app/
    components/
      ui/         # Reusable UI components
      layout/     # Layout components (header, footer)
      features/   # Feature-specific components
    lib/
      constants.ts   # Shared constants
      types.ts       # TypeScript type definitions
      utils.ts       # Utility functions
    page.tsx      # Home page
    layout.tsx    # Root layout
```

## Development

First, run the development server:

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Best Practices

- Use Server Components where possible
- Client components are marked with "use client" directive
- Constants are stored in constants.ts
- TypeScript interfaces are in types.ts
- Utility functions are in utils.ts
- Follow component categorization (UI, Layout, Features)

## Deployment

The project is configured for deployment on Vercel with Analytics and Speed Insights enabled.

## Learn More

To learn more about Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
