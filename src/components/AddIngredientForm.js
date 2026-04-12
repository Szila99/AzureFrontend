import React, { useState } from 'react';
import { ingredientApi } from '../api';

const AddIngredientForm = ({ onIngredientCreated, onIngredientUpdated }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id' ? parseInt(value) || '' : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Ingredient name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const ingredientData = {
        name: formData.name
      };

      if (formData.id) {
        ingredientData.id = formData.id;
        const response = await ingredientApi.update(ingredientData);
        onIngredientUpdated(response.data);
      } else {
        const response = await ingredientApi.create(ingredientData);
        onIngredientCreated(response.data);
      }

      // Reset form after successful submit
      setFormData({ id: '', name: '' });
    } catch (err) {
      setError('Failed to save ingredient: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add/Edit Ingredient</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ingredient Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {formData.id && (
          <div className="form-group">
            <label htmlFor="id">Ingredient ID:</label>
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
          {loading ? 'Saving...' : formData.id ? 'Update Ingredient' : 'Add Ingredient'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setFormData({ id: '', name: '' });
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

export default AddIngredientForm;