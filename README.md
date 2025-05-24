# Cafinder - Cafe Finder Web Application

Cafinder is a web application to help users find cafes in Surabaya, Indonesia.

## Features

- Interactive cafe map with filters
- Cafe catalog with search and filtering options
- Detailed cafe pages with information
- Save favorite cafes

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/cafinder-project.git
cd cafinder-project
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
   - Copy the `.env.example` file to `.env`
   - Add your Mapbox API key to `.env` (Get one from [Mapbox](https://account.mapbox.com/))

### Running the Application

1. Generate cafe pages
```
npm run generate-cafes
```

2. Start the development server
```
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/css` - Stylesheets
- `/js` - JavaScript files
- `/cafes` - Generated cafe detail pages
- `/images` - Image assets
- `cafes_preview.json` - Cafe data

## Scripts

- `npm run generate-cafes` - Generate cafe detail pages
- `npm run dev` - Start development server
- `npm run build` - Build for production

## Technologies Used

- HTML5, CSS3, JavaScript
- Mapbox GL JS / Leaflet for map functionality
- GSAP for animations
- LocalStorage for saving preferences

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The cafe data is fictional and for demonstration purposes only
- Icons from various free sources