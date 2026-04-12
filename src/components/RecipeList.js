import React from 'react';

const RecipeList = ({ recipes, ingredients, onRecipeDeleted, onRecipeUpdated }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      onRecipeDeleted(id);
    }
  };

  const handleUpdate = (recipe) => {
    // In a real app, this would open an edit form or modal
    onRecipeUpdated(recipe);
  };

  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <p>No recipes found</p>
      </div>
    );
  }

  return (
    <div>
      {recipes.map(recipe => {
        // Find ingredient names for display
        const ingredientNames = recipe.ingredient
          ?.map(ing => {
            const found = ingredients.find(i => i.id === ing.id);
            return found ? found.name : ing.name;
          })
          .filter(Boolean) || [];

        return (
          <div key={recipe.id} className="recipe-card">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200?placeholder=No+Image';
                e.target.onError = null;
              }}
            />
            <div>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              {ingredientNames.length > 0 && (
                <div>
                  <strong>Ingredients:</strong>
                  <div>
                    {ingredientNames.map(name => (
                      <span key={name} className="ingredient-tag">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="item-actions">
                <button
                  className="btn btn-warning"
                  onClick={() => handleUpdate(recipe)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(recipe.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;