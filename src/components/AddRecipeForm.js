import React, { useState } from 'react';
import { recipeApi } from '../api';

const AddRecipeForm = ({ ingredients, onRecipeCreated, onRecipeUpdated }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    ingredientIds: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      if (name === 'ingredientIds') {
        if (type === 'checkbox') {
          return {
            ...prev,
            ingredientIds: checked
              ? [...prev.ingredientIds, parseInt(value)]
              : prev.ingredientIds.filter(id => id !== parseInt(value))
          };
        }
      }
      return {
        ...prev,
        [name]: name === 'id' ? (value ? parseInt(value) : '') : value
      };
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.image.trim()) {
      setError('Name, description, and image URL are required');
      return;
    }
    if (formData.ingredientIds.length === 0) {
      setError('Please select at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const recipeData = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        ingredient: formData.ingredientIds.map(id => ({ id }))
      };

      if (formData.id) {
        recipeData.id = formData.id;
        const response = await recipeApi.update(recipeData);
        onRecipeUpdated(response.data);
      } else {
        const response = await recipeApi.create(recipeData);
        onRecipeCreated(response.data);
      }

      // Reset form after successful submit
      setFormData({
        id: '',
        name: '',
        description: '',
        image: '',
        ingredientIds: [],
      });
    } catch (err) {
      setError('Failed to save recipe: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add/Edit Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients:</label>
          {ingredients.map(ingredient => (
            <div key={ingredient.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <input
                type="checkbox"
                id={`ingredient-${ingredient.id}`}
                name="ingredientIds"
                value={ingredient.id}
                checked={formData.ingredientIds.includes(ingredient.id)}
                onChange={handleChange}
              />
              <label htmlFor={`ingredient-${ingredient.id}`} style={{ marginLeft: '8px' }}>
                {ingredient.name}
              </label>
            </div>
          ))}
        </div>

        {formData.id && (
          <div className="form-group">
            <label htmlFor="id">Recipe ID:</label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              readOnly
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : formData.id ? 'Update Recipe' : 'Add Recipe'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setFormData({
              id: '',
              name: '',
              description: '',
              image: '',
              ingredientIds: [],
            });
            setError('');
          }}
        >
          Clear
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AddRecipeForm;