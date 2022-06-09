/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import Components from './views/Components.js';

const init = () => {
  document
    .getElementById('filters')
    .appendChild(Components.filtersBtn({ type: 'ingredients', filters: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }));
  document
    .getElementById('filters')
    .appendChild(Components.filtersBtn({ type: 'appliences', filters: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }));
  document
    .getElementById('filters')
    .appendChild(Components.filtersBtn({ type: 'tools', filters: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }));

  for (let i = 0; i < 10; i += 1) {
    document.getElementById('recipes').appendChild(
      Components.recipeCard({
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
};

init();
