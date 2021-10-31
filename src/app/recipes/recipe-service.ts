import { Recipe } from "./recipe.model";
export class RecipeService{

    recipes: Recipe[] = [
        new Recipe('Spicy meatballs','Easy to prepare','https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?webp=true&quality=90&resize=940%2C399'),
        new Recipe('Macedonian salad','You only need fresh vegetables and ofcourse brandy','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfpfhMfa0e7WOXKA4ScVcv2Rodj3QNgFchlg&usqp=CAU')
      ];

      getReipes(){
          return this.recipes.slice();
      }

}