import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../recipe-service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('Spicy meatballs','Easy to prepare','https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?webp=true&quality=90&resize=940%2C399'),
        new Recipe('Macedonian salad','You only need fresh vegetables and ofcourse brandy','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfpfhMfa0e7WOXKA4ScVcv2Rodj3QNgFchlg&usqp=CAU')
  ];

  constructor() { }
//private recipeService: RecipeService
  ngOnInit(): void {
    // this.recipes = this.recipeService.getReipes();
  }

  onRecepieSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
