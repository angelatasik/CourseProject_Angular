import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();


    private recipes: Recipe[] = [
        new Recipe('Spicy meatballs',
        'Easy to prepare',
        'data:image/jpeg;base64,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',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 2)
        ]
        ),
        new Recipe('Macedonian salad','You only need fresh vegetables and ofcourse brandy','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfpfhMfa0e7WOXKA4ScVcv2Rodj3QNgFchlg&usqp=CAU',[
            new Ingredient('Buns', 1),
            new Ingredient('Meat', 5)
        ])
      ];

      constructor(private lsservice: ShoppingListService) {}

      getReipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }
      addIngToShoppingList(ingredients: Ingredient[]){
        this.lsservice.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice()); //nre value->copy of the recipes
      }

      updateRecipe(index: number, newRecepie: Recipe){
        this.recipes[index] = newRecepie;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}