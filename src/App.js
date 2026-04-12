import React, { useState, useEffect } from 'react';
import { ingredientApi, recipeApi } from './api';
import RecipeList from './components/RecipeList';
import IngredientList from './components/IngredientList';
import AddRecipeForm from './components/AddRecipeForm';
import AddIngredientForm from './components/AddIngredientForm';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recipesResponse, ingredientsResponse] = await Promise.all([
        recipeApi.getAll(),
        ingredientApi.getAll()
      ]);
      setRecipes(recipesResponse.data);
      setIngredients(ingredientsResponse.data);
      setError('');
    } catch (err) {
      setError('Failed to load data: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRecipeCreated = (newRecipe) => {
    setRecipes([newRecipe, ...recipes]);
  };

  const handleIngredientCreated = (newIngredient) => {
    setIngredients([newIngredient, ...ingredients]);
  };

  const handleRecipeUpdated = (updatedRecipe) => {
    setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
  };

  const handleIngredientUpdated = (updatedIngredient) => {
    setIngredients(ingredients.map(i => i.id === updatedIngredient.id ? updatedIngredient : i));
  };

  const handleRecipeDeleted = (recipeId) => {
    setRecipes(recipes.filter(r => r.id !== recipeId));
  };

  const handleIngredientDeleted = (ingredientId) => {
    setIngredients(ingredients.filter(i => i.id !== ingredientId));
  };

  if (loading) {
    return (
      <div className="App">
        <div className="header">
          <h1>Recipe App</h1>
        </div>
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="header">
          <h1>Recipe App</h1>
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Recipe App</h1>
        <p>Manage your recipes and ingredients</p>
      </div>

      <div className="container">
        {/* Ingredients Panel */}
        <div className="panel">
          <h2>Ingredients</h2>
          <AddIngredientForm
            onIngredientCreated={handleIngredientCreated}
            onIngredientUpdated={handleIngredientUpdated}
          />
          <IngredientList
            ingredients={ingredients}
            onIngredientDeleted={handleIngredientDeleted}
            onIngredientUpdated={handleIngredientUpdated}
          />
        </div>

        {/* Recipes Panel */}
        <div className="panel">
          <h2>Recipes</h2>
          <AddRecipeForm
            ingredients={ingredients}
            onRecipeCreated={handleRecipeCreated}
            onRecipeUpdated={handleRecipeUpdated}
          />
          <RecipeList
            recipes={recipes}
            ingredients={ingredients}
            onRecipeDeleted={handleRecipeDeleted}
            onRecipeUpdated={handleRecipeUpdated}
          />
        </div>
      </div>
    </div>
  );
}

export default App;