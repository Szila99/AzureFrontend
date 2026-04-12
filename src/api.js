import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const ingredientApi = {
  getAll: (name, recipe) => api.get('/ingredient', { params: { name, recipe } }),
  create: (data) => api.post('/ingredient', data),
  update: (data) => api.put('/ingredient', data),
  delete: (id) => api.delete(`/ingredient?IngredientId=${id}`),
};

export const recipeApi = {
  getAll: (name, ingredientName, descriptionKeyword, image) =>
    api.get('/recipe', { params: { name, ingredientName, descriptionKeyword, image } }),
  getCookable: (ingredients) =>
    api.get('/recipe/Cookable', { params: { ingredients } }),
  create: (data) => api.post('/recipe', data),
  update: (data) => api.put('/recipe', data),
  delete: (id) => api.delete(`/recipe?recipeId=${id}`),
};