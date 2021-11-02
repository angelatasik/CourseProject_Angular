import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    // { path: '', redirectTo: '/recipes' }, ->vaka kje ni dade error
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children:[
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent},
        { path: ':id', component: RecipeDetailComponent },
        // { path: 'new', component: RecipeEditComponent}, ako e tuka nema da raboti!!
        { path: ':id/edit', component: RecipeEditComponent}
    ] },
    { path: 'shopping-list', component: ShoppingListComponent } 
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], //my routes are configured and added to Angular Router
    exports: [RouterModule]
})
export class AppRoutingModule {

}