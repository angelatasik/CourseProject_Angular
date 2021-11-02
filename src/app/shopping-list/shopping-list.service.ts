import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
 
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bannanas', 15)
      ];

      getIngredients(){
        return this.ingredients.slice(); //WITH this we get a copy
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIng(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        // for(let ing of ingredients) 
        // {
        //   this.addIng(ing);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIng(index: number, newIng: Ingredient){
        this.ingredients[index] = newIng;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIng(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}