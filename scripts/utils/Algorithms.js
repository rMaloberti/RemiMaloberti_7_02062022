/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import SearchHelper from './SearchHelper.js';

// ALGORITHMS
export default class Algorithms {
  // ALGORITHM 1 (NATIVE LOOPS)
  static algo1 = (references, searchValue) => {
    // Recipes Ids Set to return
    const recipesIds = new Set();

    for (let i = 0; i < references.length; i += 1) {
      if (SearchHelper.normalize(references[i].value).includes(searchValue)) {
        for (let j = 0; j < references[i].recipeIds.length; j += 1) {
          recipesIds.add(references[i].recipeIds[j]);
        }
      }
    }

    return recipesIds;
  };

  // ALGORITHM 2 (ARRAY OBJECT METHODS)
  static algo2 = (references, searchValue) => {
    // Recipes Ids Set to return
    const recipesIds = new Set();

    references.forEach((reference) => {
      if (SearchHelper.normalize(reference.value).includes(searchValue)) {
        reference.recipeIds.forEach((recipeId) => {
          recipesIds.add(recipeId);
        });
      }
    });

    return recipesIds;
  };

  // FILTER SEARCH ALGORITHM
  static filterAlgo = (references, searchValue) => {
    // Filtered references Set to return
    const filteredReferences = new Set();

    references.forEach((reference) => {
      if (SearchHelper.normalize(reference.value).includes(searchValue)) {
        filteredReferences.add(reference);
      }
    });

    return filteredReferences;
  };
}
