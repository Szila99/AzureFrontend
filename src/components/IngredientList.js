import React from 'react';

const IngredientList = ({ ingredients, onIngredientDeleted, onIngredientUpdated }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ingredient?')) {
      onIngredientDeleted(id);
    }
  };

  const handleUpdate = (ingredient) => {
    // In a real app, this would open an edit form or modal
    // For simplicity, we'll just call the update callback with current data
    onIngredientUpdated(ingredient);
  };

  if (ingredients.length === 0) {
    return (
      <div className="empty-state">
        <p>No ingredients found</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {ingredients.map(ingredient => (
        <div key={ingredient.id} className="item">
          <div className="item-info">
            <h3>{ingredient.name}</h3>
            {ingredient.recipes && ingredient.recipes.length > 0 && (
              <div>
                <strong>Used in:</strong>
                <div>
                  {ingredient.recipes.map(recipe => (
                    <span key={recipe.id} className="ingredient-tag">
                      {recipe.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="item-actions">
            <button
              className="btn btn-warning"
              onClick={() => handleUpdate(ingredient)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(ingredient.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;