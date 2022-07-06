/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';

const init = () => {
  const recipes = RecipesModel.getRecipes();
  const references = RecipesModel.getReferences(recipes);

  HomeView.displayPage(recipes, references);

  console.log(RecipesModel.getReferences(RecipesModel.getRecipes()));
};

init();
