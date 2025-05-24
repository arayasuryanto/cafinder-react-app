# Cafinder React

A React version of the Cafinder project for finding and exploring cafes in Surabaya.

## Project Structure

```
cafinder-react/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── home/           # Homepage components
│   │   ├── cafemap/        # Map-related components
│   │   ├── catalog/        # Catalog page components
│   │   └── cafeDetail/     # Cafe detail page components
│   ├── pages/              # Page components
│   ├── services/           # API and data services
│   ├── utils/              # Utility functions
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── assets/             # Local assets (images, icons)
│   ├── styles/             # CSS styles
│   ├── App.jsx             # Main App component
│   └── index.js            # Entry point
└── package.json           # Dependencies and scripts
```

## Features

- Browse cafes on an interactive map
- Search and filter cafes by name, location, or features
- View detailed information about cafes
- Save favorite cafes
- Responsive design for mobile and desktop

## Tech Stack

- React
- React Router for navigation
- Mapbox GL JS for maps
- GSAP for animations
- Context API for state management
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cafinder-react
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Deployment

This project can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the contents of the `build` folder to your hosting service of choice.

## License

MIT