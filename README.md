# Recipe App Frontend

A React frontend for the Recipe API backend.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   Adjust the URL if your backend is running on a different address.

## Development

To start the development server:
```
npm start
```

The app will be available at `http://localhost:3000`.

## Building for Production

To create a production build:
```
npm run build
```

The built files will be in the `build` directory.

## Deployment to Azure

This frontend can be deployed to Azure App Service:

1. Build the application: `npm run build`
2. Deploy the contents of the `build` folder to your Azure App Service
3. Configure the app service to serve static files

Alternatively, you can use Azure Static Web Apps for easier deployment.

## API Endpoints Used

The frontend interacts with the following backend endpoints:

### Ingredients
- GET `/api/ingredient` - Get all ingredients (with optional name and recipe filters)
- POST `/api/ingredient` - Create a new ingredient
- PUT `/api/ingredient` - Update an existing ingredient
- DELETE `/api/ingredient?IngredientId={id}` - Delete an ingredient

### Recipes
- GET `/api/recipe` - Get all recipes (with optional filters)
- GET `/api/recipe/Cookable` - Get recipes that can be made with provided ingredients
- POST `/api/recipe` - Create a new recipe
- PUT `/api/recipe` - Update an existing recipe
- DELETE `/api/recipe?recipeId={id}` - Delete a recipe

## Features

- View list of ingredients and recipes
- Add new ingredients and recipes
- Edit existing ingredients and recipes
- Delete ingredients and recipes
- View recipes that can be made with available ingredients
- Responsive design for mobile and desktop

## Component Structure

- `App.js` - Main application component
- `components/IngredientList.js` - Displays list of ingredients
- `components/RecipeList.js` - Displays list of recipes
- `components/AddIngredientForm.js` - Form for adding/editing ingredients
- `components/AddRecipeForm.js` - Form for adding/editing recipes
- `api.js` - API service functions

## Styling

The application uses custom CSS in `src/index.css` for a clean, responsive design.