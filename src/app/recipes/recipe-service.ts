import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Spicy meatballs',
        'Easy to prepare',
        'https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?webp=true&quality=90&resize=940%2C399',
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

      addIngToShoppingList(ingredients: Ingredient[]){
        this.lsservice.addIngredients(ingredients);
      }

}