# React Migration Plan for Cafinder Project

## Project Structure
```
cafinder-react/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── images/ (copied from current project)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedCafes.jsx
│   │   │   ├── CafeCategories.jsx
│   │   │   └── SearchForm.jsx
│   │   ├── cafemap/
│   │   │   ├── CafeMap.jsx
│   │   │   ├── MapControls.jsx
│   │   │   └── SavedCafes.jsx
│   │   ├── catalog/
│   │   │   ├── CafeGrid.jsx
│   │   │   ├── CafeCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Filters.jsx
│   │   └── cafeDetail/
│   │       ├── CafeHeader.jsx
│   │       ├── CafeInfo.jsx
│   │       ├── CafeGallery.jsx
│   │       └── CafeReviews.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── CafeMapPage.jsx
│   │   ├── CatalogPage.jsx
│   │   └── CafeDetailPage.jsx
│   ├── services/
│   │   ├── mapService.js
│   │   ├── cafeService.js
│   │   └── storageService.js
│   ├── utils/
│   │   ├── animations.js
│   │   └── helpers.js
│   ├── context/
│   │   ├── CafeContext.jsx
│   │   └── UserContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useGeolocation.js
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── styles/
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── components/
│   │       ├── header.css
│   │       ├── footer.css
│   │       └── ...
│   ├── App.jsx
│   ├── index.js
│   └── setupTests.js
├── package.json
└── README.md
```

## Dependencies to Add
- React Router for navigation
- Mapbox GL JS for maps
- GSAP for animations
- Axios for HTTP requests
- React Icons for icons

## Migration Steps
1. Initialize a new React project with Create React App
2. Set up folder structure according to plan
3. Configure React Router for navigation
4. Migrate homepage components
5. Implement cafe map page with Mapbox GL JS
6. Build catalog page with search and filtering
7. Create cafe detail pages with dynamic routing
8. Migrate styles to CSS modules or styled components
9. Implement context for state management
10. Add proper animations with GSAP
11. Optimize performance with React best practices
12. Add PWA features
13. Implement testing

## Data Flow
1. Fetch cafe data from JSON files initially
2. Store in React context for global state
3. Use local storage for saved cafes
4. Implement filters and search with React state

## Routing Structure
- `/` - Home page
- `/map` - Interactive map
- `/catalog` - Catalog of all cafes
- `/cafe/:id` - Individual cafe detail page