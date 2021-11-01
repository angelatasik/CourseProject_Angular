import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService{

  ingredientsChanged = new EventEmitter<Ingredient[]>();
 
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bannanas', 15)
      ];

      getIngredients(){
        return this.ingredients.slice(); //WITH this we get a copy
      }

      addIng(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.emit(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        // for(let ing of ingredients) 
        // {
        //   this.addIng(ing);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
      }
}