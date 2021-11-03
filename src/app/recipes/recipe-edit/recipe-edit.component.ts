import { Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe-service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        // console.log(this.editMode);
      }
    )
  }
  onCancel(){
//use router to navigate:
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  cancelIng(index: number){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onSubmit(){
    // console.log(this.recipeForm);

    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['descripion'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']);
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIng(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  private initForm(){
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeName = '';
    let recipeIng = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe['ingredients']){ //if recipe does have a ingredients
        for(let ing of recipe.ingredients){
          recipeIng.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      } 
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIng

    });
  }

}
