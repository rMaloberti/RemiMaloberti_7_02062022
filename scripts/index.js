/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import ComponentsView from './views/ComponentsView.js';
import HomeView from './views/HomeView.js';

const init = () => {
  const recipes = RecipesModel.getRecipes();
  const references = RecipesModel.getReferences(recipes);

  HomeView.displayPage(recipes, references);

  for (let i = 0; i < 10; i += 1) {
    document.getElementById('recipes').appendChild(
      ComponentsView.recipeCard({
        recipeId: 1,
        recipeTitle: 'Limonade de Coco',
        recipeTime: 10,
        recipeIngredients: [
          {
            ingredient: 'Lait de coco',
            quantity: 400,
            unit: 'ml',
          },
          {
            ingredient: 'Jus de citron',
            quantity: 2,
          },
          {
            ingredient: 'Crème de coco',
            quantity: 2,
            unit: 'cuillères à soupe',
          },
          {
            ingredient: 'Sucre',
            quantite: 30,
            unit: 'grammes',
          },
          {
            ingredient: 'Glaçons',
          },
        ],
        recipeDesc:
          "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
      })
    );
  }

  console.log(RecipesModel.getReferences(RecipesModel.getRecipes()));
};

init();
