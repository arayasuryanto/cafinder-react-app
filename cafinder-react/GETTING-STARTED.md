# Getting Started with Cafinder React

This document provides a quick guide to running and developing the Cafinder React application.

## Running the Application

### Development Mode

To run the application in development mode:

```bash
cd cafinder-react
npm start
```

This will start the development server and open the application in your browser at [http://localhost:3000](http://localhost:3000).

### Production Build

To create a production build:

```bash
cd cafinder-react
npm run build
```

This will create a `build` folder with optimized production files. You can serve these files using any static file server:

```bash
npm install -g serve
serve -s build
```

## Project Structure

The project follows a standard React application structure:

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/services/` - Data services
- `src/context/` - Context providers for state management
- `src/styles/` - CSS styles
- `src/assets/` - Static assets

## Key Features

### Home Page

The home page (`/`) displays:
- A hero section with a call to action
- A search form for finding cafes
- Featured cafes section
- Cafe categories

### Cafe Map

The cafe map page (`/map`) shows:
- An interactive map with cafe locations
- Filtering controls
- Saved cafes list

### Catalog

The catalog page (`/catalog`) displays:
- A grid of all cafes
- Search and filtering options
- Sort options

### Cafe Details

The cafe detail page (`/cafe/:id`) shows:
- Detailed information about a specific cafe
- Photos
- Opening hours
- Features and amenities

## Development Notes

- The application uses React Router for navigation
- GSAP is used for animations
- Mapbox GL JS powers the interactive map
- Context API is used for state management
- The cafe data is currently stored in the services directory

## Next Steps

See [README-NEXT-STEPS.md](./README-NEXT-STEPS.md) for future enhancements and planned features.

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Clear the cache:
   ```bash
   npm cache clean --force
   ```

3. If you're having port conflicts, you can specify a different port:
   ```bash
   PORT=3001 npm start
   ```